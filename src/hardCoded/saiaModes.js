const saiaModes = {
    "qa": {
        PROFILE: process.env.REACT_APP_PROFILE_DEFAULT,
        BASE_URL: process.env.REACT_APP_QA_BASE_URL,
        API_TOKEN: process.env.REACT_APP_QA_API_TOKEN,
    },
    "beta": {
        PROFILE: process.env.REACT_APP_PROFILE_DEFAULT,
        BASE_URL: process.env.REACT_APP_BETA_BASE_URL,
        API_TOKEN: process.env.REACT_APP_BETA_API_TOKEN,
    }
}

console.log(saiaModes)


const activeMode = saiaModes["beta"]

export const saiaMode = {
    PROFILE: activeMode.PROFILE,
    BASE_URL: activeMode.BASE_URL,
    API_TOKEN: activeMode.API_TOKEN,
    PUT_URL: `${activeMode.BASE_URL}/v1/search/profile/${activeMode.PROFILE}`,
    EXECUTE_URL: `${activeMode.BASE_URL}/v1/search/execute`,
    HEADERS: {
        "Authorization": `Bearer ${activeMode.API_TOKEN}`,
        "Accept": "application/json",
        "Content-Type": "application/json" 
    }
}
