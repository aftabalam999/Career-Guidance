const testAuth = async () => {
    try {
        console.log("--- Testing Registration ---");
        const resReg = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: 'Test Student',
                email: `test_${Date.now()}@example.com`,
                password: 'password123',
                role: 'student'
            })
        });
        const regData = await resReg.json();
        console.log("Registration Status:", resReg.status);
        console.log("Registration Response:", regData);

        if (resReg.status === 201) {
            console.log("\n--- Testing Login ---");
            const resLog = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: regData.email,
                    password: 'password123'
                })
            });
            const logData = await resLog.json();
            console.log("Login Status:", resLog.status);
            console.log("Login Response:", logData);
            
            if(logData.token) {
                console.log("\n✅ Authentication system is working perfectly. JWT Token generated successfully.");
            }
        }
    } catch(err) {
        console.error("Test failed:", err);
    }
}
testAuth();
