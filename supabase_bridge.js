import { createClient } from '@supabase/supabase-client'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

async function fetchStationLogic() {
    const { data, error } = await supabase
        .from('station_config')
        .select('key, value')
    
    if (data) {
        data.forEach(item => {
            if (item.key === 'multi_region_price') {
                document.querySelectorAll('.price-multi').forEach(el => el.innerText = '£' + item.value);
            }
        });
    }
}
fetchStationLogic();
