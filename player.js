const pricingData = {
    regional: 299,
    multiRegional: 449,
    creative: 195
};

function loadPricing() {
    const container = document.getElementById('pricing-component');
    if (container) {
        container.innerHTML = `
            <div style="background: rgba(20, 20, 20, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255, 62, 0, 0.3); padding: 30px; border-radius: 15px; margin-bottom: 40px;">
                <h2 style="color: #ff3e00; text-transform: uppercase; margin-top: 0;">Commercial <span style="color:#fff;">Calculator</span></h2>
                <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;">
                    <div style="flex: 1; min-width: 250px;">
                        <label style="display:block; margin-bottom: 10px; font-weight: bold; color: #888;">SELECT AIRTIME PACKAGE:</label>
                        <select id="packageSelect" onchange="calculateTotal()" style="width:100%; padding:12px; background:#111; color:#fff; border:1px solid #333;">
                            <option value="299">Regional Airtime - £299</option>
                            <option value="449">Multi-Regional Airtime - £449</option>
                            <option value="0">None (Production Only)</option>
                        </select>
                    </div>
                    <div style="flex: 1; min-width: 250px;">
                        <label style="display:block; margin-bottom: 10px; font-weight: bold; color: #888;">ADD PRODUCTION?</label>
                        <select id="prodSelect" onchange="calculateTotal()" style="width:100%; padding:12px; background:#111; color:#fff; border:1px solid #333;">
                            <option value="195">Creative / Production - £195</option>
                            <option value="0">No Production Needed</option>
                        </select>
                    </div>
                </div>
                <div style="text-align: right; border-top: 1px solid #222; padding-top: 20px;">
                    <span style="font-size: 1.2rem; color: #888;">ESTIMATED TOTAL: </span>
                    <span id="totalDisplay" style="font-size: 2.5rem; color: #ff3e00; font-weight: 800; margin-left: 10px;">£494</span>
                </div>
            </div>
        `;
        calculateTotal();
    }
}

function calculateTotal() {
    const pkg = parseInt(document.getElementById('packageSelect').value);
    const prod = parseInt(document.getElementById('prodSelect').value);
    document.getElementById('totalDisplay').innerText = `£${pkg + prod}`;
}

document.addEventListener('DOMContentLoaded', loadPricing);
