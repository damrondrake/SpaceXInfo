// Fetch next launch info from backend and update UI
async function fetchNextLaunch() {
    try {
        const res = await fetch('http://localhost:5000/api/next-launch');
        const data = await res.json();
        document.getElementById('launch-name').textContent = data.name || 'N/A';
        // Format date
        const date = new Date(data.date_utc);
        document.getElementById('launch-date').textContent = date.toLocaleString();
        // Countdown
        function updateCountdown() {
            const now = new Date();
            const diff = date - now;
            if (diff <= 0) {
                document.getElementById('launch-countdown').textContent = 'Launched!';
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / (1000 * 60)) % 60);
            const secs = Math.floor((diff / 1000) % 60);
            document.getElementById('launch-countdown').textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    } catch (err) {
        document.getElementById('launch-name').textContent = 'Error';
        document.getElementById('launch-date').textContent = 'Error';
        document.getElementById('launch-countdown').textContent = 'Error';
    }
}
fetchNextLaunch();

// Fetch recent launches from backend and update launches section
async function fetchRecentLaunches() {
    try {
        const res = await fetch('https://api.spacexdata.com/v5/launches/latest');
        const launch = await res.json();
        const launchesList = document.getElementById('launches-list');
        launchesList.innerHTML = '';
        // Get rocket name (need another API call)
        let rocketName = 'N/A';
        if (launch.rocket) {
            try {
                const rocketRes = await fetch(`https://api.spacexdata.com/v4/rockets/${launch.rocket}`);
                const rocketData = await rocketRes.json();
                rocketName = rocketData.name || 'N/A';
            } catch {}
        }
        // Get launchpad name (need another API call)
        let padName = 'N/A';
        if (launch.launchpad) {
            try {
                const padRes = await fetch(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`);
                const padData = await padRes.json();
                padName = padData.name || 'N/A';
            } catch {}
        }
        // Patch image
        const patchImg = launch.links?.patch?.small || '';
        // Webcast link
        const webcast = launch.links?.webcast || '';
        // Article link
        const article = launch.links?.article || '';
        // Wikipedia link
        const wiki = launch.links?.wikipedia || '';
        // Create launch item styled like the rest of the site
        const item = document.createElement('div');
        item.className = 'launch-item';
        item.innerHTML = `
            <div class="launch-links">
                ${webcast ? `<span class="launch-link-narrative">Watch the official webcast:</span><a class="launch-link" href="${webcast}" target="_blank">Webcast</a>` : ''}
                ${wiki ? `<span class="launch-link-narrative">Learn more on Wikipedia:</span><a class="launch-link" href="${wiki}" target="_blank">Wikipedia</a>` : ''}
            </div>
            <div class="launch-item-content">
                <h3>${launch.name || 'N/A'}</h3>
                <dl class="launch-details">
                    <dt>Flight Number:</dt>
                    <dd>${launch.flight_number || 'N/A'}</dd>
                    <dt>Date & Time:</dt>
                    <dd>${new Date(launch.date_utc).toLocaleString()}</dd>
                    <dt>Rocket:</dt>
                    <dd>${rocketName}</dd>
                    <dt>Launch Site:</dt>
                    <dd>${padName}</dd>
                    <dt>Success or Failure:</dt>
                    <dd>${launch.success ? 'Success' : 'Failure'}</dd>
                </dl>
                <p>${launch.details || ''}</p>
            </div>
            ${patchImg ? `<img src="${patchImg}" alt="Mission Patch">` : ''}
        `;
        launchesList.appendChild(item);
    } catch (err) {
        document.getElementById('launches-list').innerHTML = '<p>Error loading launches.</p>';
    }
}
fetchRecentLaunches();
