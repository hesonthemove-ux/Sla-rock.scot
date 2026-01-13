// Sla-rock.scot Global Pricing Component
// Update these values here to change them across the entire site instantly.

const pricingData = {
    regional: "£299",
    multiRegional: "£449",
    creative: "£195"
};

function loadPricing() {
    const container = document.getElementById('pricing-component');
    if (container) {
        container.innerHTML = `
            <div style="margin-top: 30px; border: 1px solid #333; border-radius: 8px; overflow: hidden; background: #1a1a1a;">
                <table style="width: 100%; border-collapse: collapse; color: #fff; font-family: Arial, sans-serif;">
                    <thead>
                        <tr style="background-color: #cc0000;">
                            <th style="padding: 15px; text-align: left; border-bottom: 2px solid #900;">Service Type</th>
                            <th style="padding: 15px; text-align: left; border-bottom: 2px solid #900;">Rate (GBP)</th>
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
            </div>
        `;
    }
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', loadPricing);
