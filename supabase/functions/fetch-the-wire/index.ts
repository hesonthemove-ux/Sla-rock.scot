import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { parseFeed } from 'https://deno.land/x/rss/mod.ts'

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // 1. Fetch your 8 active sources from the DB
  const { data: sources } = await supabase
    .from('news_sources')
    .select('*')
    .eq('is_active', true)

  const results = []

  for (const source of sources) {
    try {
      const response = await fetch(source.rss_url)
      const xml = await response.text()
      const feed = await parseFeed(xml)

      // 2. Get the latest headline
      const latest = feed.entries[0]
      
      // 3. Upsert into news_wire (preventing duplicates via source_url)
      await supabase.from('news_wire').upsert({
        headline: latest.title.value,
        source_name: source.source_name,
        source_url: latest.links[0].href,
        genre: source.master_genre,
        is_local_scotland: source.source_name.includes('Scotsman') || source.source_name.includes('Skinny')
      }, { onConflict: 'source_url' })

      // 4. Increment the heart-beat count we built in v10.73
      await supabase.rpc('set_news_source_last_scraped', { p_id: source.id })
      
      results.push(`Updated ${source.source_name}`)
    } catch (err) {
      results.push(`Error on ${source.source_name}: ${err.message}`)
    }
  }

  return new Response(JSON.stringify({ results }), { headers: { 'Content-Type': 'application/json' } })
})
