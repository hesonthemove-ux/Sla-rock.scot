/**
 * Sla-rock.scot Locked Pricing Architecture 2026
 * Rates: £299 Regional | £449 Multi-Regional | £195 Creative
 * Status: Non-VAT Registered (LOCKED)
 */

const rates = {
    regional: 299.00,
    multi: 449.00,
    creative: 195.00
};

function initCalculator() {
    const container = document.getElementById('pricing-component');
    if (!container) return;

    container.innerHTML = `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid #222; padding: 40px; color: #fff; font-family: 'Inter', sans-serif;">
            <h2 style="text-transform: uppercase; margin-top: 0; color: #ff3e00;">Rate Calculator</h2>
            <p style="color: #888; font-size: 0.9rem; margin-bottom: 30px;">Select your broadcast territory. No VAT applicable.</p>
            
            <div style="margin-bottom: 20px;">
                <label style="display:block; text-transform: uppercase; font-size: 0.7rem; font-weight: 900; margin-bottom: 10px;">Airtime Territory</label>
                <select id="airtime-select" style="width: 100%; background: #000; border: 1px solid #333; color: #fff; padding: 15px; font-weight: bold; font-size: 1rem;">
                    <option value="0">None</option>
                    <option value="${rates.regional}">Regional Airtime (£299)</option>
                    <option value="${rates.multi}">Multi-Regional Airtime (£449)</option>
                </select>
            </div>

            <div style="margin-bottom: 30px;">
                <label style="display:flex; align-items: center; gap: 15px; cursor: pointer; text-transform: uppercase; font-size: 0.7rem; font-weight: 900;">
                    <input type="checkbox" id="creative-check" style="width: 22px; height: 22px; accent-color: #ff3e00;">
                    Include Creative Production (£195)
                </label>
            </div>

            <div style="border-top: 1px solid #222; padding-top: 20px;">
                <div style="display: flex; justify-content: space-between; font-size: 2.5rem; font-weight: 900; color: #ff3e00; margin-top: 10px;">
                    <span>TOTAL</span>
                    <span id="grand-total">£0.00</span>
                </div>
            </div>
        </div>
    `;

    const airtimeSelect = document.getElementById('airtime-select');
    const creativeCheck = document.getElementById('creative-check');
    const totalEl = document.getElementById('grand-total');

    function calculate() {
        let airtimePrice = parseFloat(airtimeSelect.value);
        let creativePrice = creativeCheck.checked ? rates.creative : 0;
        let total = airtimePrice + creativePrice;
        totalEl.innerText = `£${total.toFixed(2)}`;
    }

    airtimeSelect.addEventListener('change', calculate);
    creativeCheck.addEventListener('change', calculate);
}

window.addEventListener('DOMContentLoaded', initCalculator);
