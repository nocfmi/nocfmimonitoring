document.addEventListener('DOMContentLoaded', function() {
    const githubUsername = 'nocfmi'; // Ganti dengan username GitHub Anda
    const githubRepoName = 'nocfmimonitoring'; // Ganti dengan nama repository Anda (misal: monitoring-dashboard)
    const dataFileName = 'monitoring_log.json'; // Harus sama dengan DATA_FILE_NAME di bot
    const dataUrl = `https://raw.githubusercontent.com/${githubUsername}/${githubRepoName}/main/${dataFileName}`;

    const logContainer = document.getElementById('log-container');
    const lastUpdatedTime = document.getElementById('last-updated-time');

    async function fetchAndDisplayLogs() {
        try {
            const response = await fetch(dataUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const logs = await response.json();

            logContainer.innerHTML = ''; // Kosongkan kontainer log
            if (logs.length === 0) {
                logContainer.innerHTML = '<p>No monitoring logs yet.</p>';
            } else {
                logs.forEach(log => {
                    const logEntry = document.createElement('div');
                    logEntry.classList.add('log-entry');

                    const timestamp = document.createElement('div');
                    timestamp.classList.add('log-timestamp');
                    timestamp.textContent = log.timestamp;

                    const message = document.createElement('div');
                    message.classList.add('log-message');
                    message.textContent = log.message; // Menampilkan teks asli dari log

                    logEntry.appendChild(timestamp);
                    logEntry.appendChild(message);
                    logContainer.appendChild(logEntry);
                });
            }

            const now = new Date();
            lastUpdatedTime.textContent = now.toLocaleString('id-ID', {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false
            });

        } catch (error) {
            console.error('Error fetching and displaying logs:', error);
            logContainer.innerHTML = `<p style="color: red;">Failed to load logs. Error: ${error.message}</p>`;
            lastUpdatedTime.textContent = 'Failed to load';
        }
    }

    // Panggil pertama kali saat halaman dimuat
    fetchAndDisplayLogs();

    // Set interval untuk refresh data setiap 15 detik (sesuaikan jika perlu)
    setInterval(fetchAndDisplayLogs, 15000); // Refresh setiap 15 detik
});
