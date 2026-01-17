

export const LegalContent = {
    About: () => (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">About Global Market Time</h2>
            <p>
                Global Market Time is a comprehensive dashboard designed for traders and financial enthusiasts.
                Our mission is to provide a unified platform to track global market sessions, real-time index data,
                and financial news updates in a single, intuitive interface.
            </p>
            <p>
                Whether you are tracking the opening of the NSE/BSE in India or the closing of the NYSE in New York,
                our platform ensures you stay synchronized with global trading hours.
            </p>
        </div>
    ),

    Privacy: () => (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy Policy</h2>
            <p><strong>Last Updated: January 17, 2026</strong></p>
            <p>
                At Global Market Time, we value your privacy. This policy explains how we handle data:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>No Personal Data Collection:</strong> We do not ask for or store any personal identification information (PII).</li>
                <li><strong>Local Storage:</strong> We use your browser's local storage solely to cache market data and news. This helps us provide a faster experience and stay within API limits.</li>
                <li><strong>Third-Party APIs:</strong> We use Alpha Vantage to fetch financial data. Please consult their privacy policy for information on how they handle requests.</li>
            </ul>
        </div>
    ),

    Terms: () => (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Terms of Service</h2>
            <p>
                By using Global Market Time, you agree to the following terms:
            </p>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <p className="font-bold text-red-500 underline mb-2">IMPORTANT DATA DISCLAIMER:</p>
                <p className="text-sm">
                    All financial data, including indices and news, is provided for <strong>informational purposes only</strong>.
                    While we aim for real-time accuracy via the Alpha Vantage API, data may be delayed, incomplete, or inaccurate.
                    <strong>NEVER use this data for real-world trading without verifying with official exchange sources.</strong>
                </p>
            </div>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Limit of Liability:</strong> We are not responsible for any financial losses incurred due to the use or misuse of data from this platform.</li>
                <li><strong>Usage:</strong> This tool is free for personal use. Excessive automated scraping of this site is prohibited.</li>
            </ul>
        </div>
    )
};
