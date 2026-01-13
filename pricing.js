// Sla-rock.scot Global Pricing & Calculator Component
const pricingData = {
    regional: 299,
    multiRegional: 449,
    creative: 195
};

function loadPricing() {
    const container = document.getElementById('pricing-component');
    if (container) {
        container.innerHTML = `
            <div style="background: rgba(20, 20, 20, 0.8); backdrop-filter: blur(15px); border: 1px solid rgba(255, 62, 0, 0.4); padding: 40px; border-radius: 0; margin-bottom: 40px;">
                <h2 style="color: #fff; text-transform: uppercase; margin-top: 0; font-size: 1.5rem; letter-spacing: 2px;">
                    <span style="color:#ff3e00;">Package</span> Calculator
                </h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; margin-top: 25px;">
                    <div>
                        <label style="display:block; margin-bottom: 12px; font-size: 0.7rem; font-weight: 900; color: #ff3e00; text-transform: uppercase;">Airtime Package</label>
                        <select id="packageSelect" onchange="calculateTotal()" style="width:100%; padding:15px; background:#000; color:#fff; border:1px solid #333; font-weight: bold;">
                            <option value="299">Regional Airtime - £299</option>
                            <option value="449">Multi-Regional Airtime - £449</option>
                            <option value="0">Production Only</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom: 12px; font-size: 0.7rem; font-weight: 900; color: #ff3e00; text-transform: uppercase;">Creative Add-on</label>
                        <select id="prodSelect" onchange="calculateTotal()" style="width:100%; padding:15px; background:#000; color:#fff; border:1px solid #333; font-weight: bold;">
                            <option value="195">Production Included - £195</option>
                            <option value="0">Client Supplied Audio</option>
                        </select>
                    </div>
                    <div style="text-align: right; border-left: 1px solid #222; padding-left: 30px;">
                        <label style="display:block; margin-bottom: 5px; font-size: 0.7rem; font-weight: 900; color: #888; text-transform: uppercase;">Investment Total</label>
                        <span id="totalDisplay" style="font-size: 3rem; color: #ff3e00; font-weight: 900; display: block; line-height: 1;">£494</span>
                    </div>
                </div>
            </div>
        `;
        calculateTotal();
    }
}

function calculateTotal() {
    const pkg = parseInt(document.getElementById('packageSelect').value);
    const prod = parseInt(document.getElementById('prodSelect').value);
    const total = pkg + prod;
    document.getElementById('totalDisplay').innerText = `£${total}`;
}

document.addEventListener('DOMContentLoaded', loadPricing);
