/**
 * CORS Proxy Services for Frontend-Only Job Aggregation
 * These are free public CORS proxy services that allow frontend apps to bypass CORS restrictions
 */

export const CORS_PROXIES = {
  allorigins: "https://api.allorigins.win/get?url=",
  corsproxy: "https://corsproxy.io/?",
  crossorigin: "https://crossorigin.me/",
  thingproxy: "https://thingproxy.freeboard.io/fetch/"
};

/**
 * Fetch data through CORS proxy with fallback
 */
export async function fetchWithProxy(url: string): Promise<Response> {
  const errors: string[] = [];

  // Skip direct fetch for RemoteOK to avoid CORS errors, use proxy directly
  if (url.includes('remoteok.io')) {
    console.log(`Skipping direct fetch for RemoteOK, using proxy directly...`);
  } else {
    // Try direct first for other APIs that support CORS
    try {
      console.log(`Attempting direct fetch for ${url}...`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      if (response.ok) {
        console.log(`✅ Direct fetch successful for ${url}`);
        return response;
      }
      errors.push(`Direct fetch failed: ${response.status}`);
    } catch (error) {
      errors.push(`Direct fetch error: Network issue`);
      console.warn("Direct fetch failed, trying proxy");
    }
  }

  // Try allorigins proxy with comprehensive error handling
  try {
    console.log(`Attempting allorigins proxy for ${url}...`);
    const proxyUrl = `${CORS_PROXIES.allorigins}${encodeURIComponent(url)}`;
    
    // Wrap in a timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      if (data.contents) {
        console.log(`✅ allorigins proxy successful for ${url}`);
        return new Response(data.contents, {
          status: 200,
          headers: { 'content-type': 'application/json' }
        });
      }
    }
    errors.push(`allorigins failed: ${response.status}`);
  } catch (error) {
    // Completely suppress the error to prevent UI error dialogs
    errors.push(`allorigins error: Network issue`);
    console.warn("allorigins proxy failed, trying corsproxy");
  }

  // Try corsproxy
  try {
    console.log(`Attempting corsproxy for ${url}...`);
    const response = await fetch(`${CORS_PROXIES.corsproxy}${url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    if (response.ok) {
      console.log(`✅ corsproxy successful for ${url}`);
      return response;
    }
    errors.push(`corsproxy failed: ${response.status}`);
  } catch (error) {
    errors.push(`corsproxy error: ${String(error)}`);
    console.warn("corsproxy failed");
  }

  console.error(`All proxy methods failed for ${url}:`, errors);
  // Return a failed response instead of throwing to prevent unhandled rejections
  return new Response(JSON.stringify({ error: `Unable to fetch ${url}` }), {
    status: 500,
    headers: { 'content-type': 'application/json' }
  });
}

/**
 * Fetch RSS/XML data through CORS proxy
 */
export async function fetchRSSWithProxy(url: string): Promise<string> {
  const errors: string[] = [];

  // Try allorigins for RSS
  try {
    console.log(`Attempting RSS fetch via allorigins for ${url}...`);
    const response = await fetch(`${CORS_PROXIES.allorigins}${encodeURIComponent(url)}`);
    if (response.ok) {
      const data = await response.json();
      if (data.contents) {
        console.log(`✅ RSS fetch successful for ${url}`);
        
        // Check if content is base64 encoded data URL and decode if needed
        let contents = data.contents;
        if (typeof contents === 'string' && contents.startsWith('data:')) {
          const base64Match = contents.match(/^data:[^;]+;base64,(.+)$/);
          if (base64Match) {
            try {
              contents = atob(base64Match[1]);
              console.log(`Decoded base64 RSS content from allorigins, length: ${contents.length}`);
            } catch (decodeError) {
              console.warn("Failed to decode base64 from allorigins:", decodeError);
            }
          }
        }
        
        return contents;
      }
    }
    errors.push(`allorigins RSS failed: ${response.status}`);
  } catch (error) {
    errors.push(`allorigins RSS error: ${error}`);
    console.warn("RSS allorigins proxy failed:", error);
  }

  // Try corsproxy for RSS
  try {
    console.log(`Attempting RSS fetch via corsproxy for ${url}...`);
    const response = await fetch(`${CORS_PROXIES.corsproxy}${url}`);
    if (response.ok) {
      const text = await response.text();
      console.log(`✅ RSS corsproxy successful for ${url}`);
      return text;
    }
    errors.push(`corsproxy RSS failed: ${response.status}`);
  } catch (error) {
    errors.push(`corsproxy RSS error: ${error}`);
    console.warn("RSS corsproxy failed:", error);
  }
  
  console.error(`Unable to fetch RSS through any proxy for ${url}:`, errors);
  throw new Error(`RSS fetch failed: ${url}`);
}