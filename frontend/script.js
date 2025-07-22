function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// Fetch meter details from backend
async function fetchMeterDetails() {
    try {
        const response = await fetch('http://localhost:5000/meters');
        const data = await response.json();
        const container = document.getElementById('meter-details');
        if (Array.isArray(data)) {
            container.innerHTML = '<table><tr>' +
                Object.keys(data[0]).map(key => `<th>${key}</th>`).join('') + '</tr>' +
                data.map(row => '<tr>' + Object.values(row).map(val => `<td>${val}</td>`).join('') + '</tr>').join('') + '</table>';
        } else {
            container.textContent = 'No data or error: ' + JSON.stringify(data);
        }
    } catch (err) {
        document.getElementById('meter-details').textContent = 'Error fetching data.';
    }
}

// Call fetchMeterDetails on page load
window.onload = fetchMeterDetails;

// --- Sample data for Preview Values and Plotting ---
const samplePreview = [
    { MeterName: 'MeterA', Value: 12.5, Timestamp: '2025-07-20 10:00' },
    { MeterName: 'MeterB', Value: 15.2, Timestamp: '2025-07-20 10:05' },
    { MeterName: 'MeterA', Value: 13.1, Timestamp: '2025-07-20 11:00' },
    { MeterName: 'MeterC', Value: 10.8, Timestamp: '2025-07-20 10:10' }
];

function showPreviewValues() {
    const container = document.getElementById('preview-values');
    if (samplePreview.length > 0) {
        container.innerHTML = '<table><tr>' +
            Object.keys(samplePreview[0]).map(key => `<th>${key}</th>`).join('') + '</tr>' +
            samplePreview.map(row => '<tr>' + Object.values(row).map(val => `<td>${val}</td>`).join('') + '</tr>').join('') + '</table>';
    } else {
        container.textContent = 'No preview data.';
    }
}

function showPlot() {
    // Group data by MeterName for plotting
    const meterNames = [...new Set(samplePreview.map(d => d.MeterName))];
    const datasets = meterNames.map(name => {
        const data = samplePreview.filter(d => d.MeterName === name).map(d => ({ x: d.Timestamp, y: d.Value }));
        return {
            label: name,
            data,
            fill: false,
            borderColor: '#' + Math.floor(Math.random()*16777215).toString(16),
            tension: 0.1
        };
    });
    const ctx = document.getElementById('meterChart').getContext('2d');
    if (window.meterChart) window.meterChart.destroy();
    window.meterChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets
        },
        options: {
            parsing: false,
            scales: {
                x: { type: 'category', title: { display: true, text: 'Timestamp' } },
                y: { title: { display: true, text: 'Value' } }
            }
        }
    });
}

// Enhance navigation to load data for each page
const origShowPage = showPage;
showPage = function(pageId) {
    origShowPage(pageId);
    if (pageId === 'preview') showPreviewValues();
    if (pageId === 'plot') showPlot();
};
