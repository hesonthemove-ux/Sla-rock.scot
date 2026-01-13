// Sla-rock.scot Global Pricing Component
// Update these values once to change them across the entire site.

const pricingData = {
    regional: "£299",
    multiRegional: "£449",
    creative: "£195"
};

function loadPricing() {
    const container = document.getElementById('pricing-component');
    if (container) {
        container.innerHTML = `
            <section class="pricing-container">
                <h2 style="color: #cc0000; border-bottom: 2px solid #cc0000; padding-bottom: 10px;">Advertising & Production</h2>
                <table style="width: 100%; border-collapse: collapse; background: #1a1a1a; border-radius: 8px; overflow: hidden; margin-top: 20px;">
                    <thead>
                        <tr style="background-color: #cc0000; color: white;">
                            <th style="padding: 15px; text-align: left;">Service Type</th>
                            <th style="padding: 15px; text-align: left;">Rate (GBP)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 15px; border-bottom: 1px solid #333;">Regional Airtime</td>
                            <td style="padding: 15px; border-bottom: 1px solid #333; font-weight: bold; color: #cc0000;">${pricingData.regional}</td>
                        </tr>
                        <tr>
                            <td style="padding: 15px; border-bottom: 1px solid #333;">Multi-Regional Airtime</td>
                            <td style="padding: 15px; border-bottom: 1px solid #333; font-weight: bold; color: #cc0000;">${pricingData.multiRegional}</td>
                        </tr>
                        <tr>
                            <td style="padding: 15px;">Creative / Production</td>
                            <td style="padding: 15px; font-weight: bold; color: #cc0000;">${pricingData.creative}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        `;
    }
}

// Run the function when the page loads
window.onload = loadPricing;
