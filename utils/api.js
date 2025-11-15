const BASE_URL = "https://umpyr.tech/api/accounts";

export async function loginRequest(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(text || "Login failed");
    }

    return JSON.parse(text);
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

export async function loginWithSession(sessionId) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "session-id": sessionId }),
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(text || "Session login failed");
    }

    return JSON.parse(text);
  } catch (err) {
    console.error("Session login error:", err);
    throw err;
  }
}

export async function signUpRequest(username, password, email) {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(text || "Signup failed");
    }

    return JSON.parse(text);
  } catch (err) {
    console.error("Signup error:", err);
    throw err;
  }
}
