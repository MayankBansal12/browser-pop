if (typeof browser === "undefined") {
  var browser = chrome;
}

async function checkExtensionStatus() {
  const result = await browser.storage.sync.get("isActive");
  const isActive =
    result && typeof result.isActive !== "undefined" ? result.isActive : true;
  return isActive;
}

async function handleBlockedUrls() {
  const isActive = await checkExtensionStatus();
  if (!isActive) {
    return;
  }

  const result = await browser.storage.sync.get("blockedUrls");
  const blockedUrls =
    result && Array.isArray(result.blockedUrls) ? result.blockedUrls : [];
  if (!blockedUrls.length) {
    return;
  }

  const isWithinActiveRange = await checkActiveRange();
  if (!isWithinActiveRange) {
    return;
  }

  const currentUrl = window.location.href;
  const currentDomain = window.location.hostname.replace("www.", "");
  blockedUrls.forEach((entry) => {
    if (entry.url === currentDomain && entry.open === true) {
      const blockedUrl = browser.runtime.getURL(
        `blocked.html?url=${decodeURIComponent(currentUrl)}`,
      );
      window.location.href = blockedUrl;
    }
  });
}

async function checkActiveRange() {
  const result = await browser.storage.sync.get(["startTime", "endTime"]);
  const startTime = result && result.startTime ? result.startTime : null;
  const endTime = result && result.endTime ? result.endTime : null;
  if (!startTime || !endTime || startTime === "--:--" || endTime === "--:--") {
    return true;
  }
  const date = new Date();
  const currentTime = date.getHours() + ":" + date.getMinutes();

  const now = parseTime(currentTime);
  let start = parseTime(startTime);
  let end = parseTime(endTime);
  if (end < start) {
    start.setDate(start.getDate() - 1);
  }
  const isWithinRange = now >= start && now <= end;
  return isWithinRange;
}

function parseTime(time, baseDate = new Date()) {
  const [hours, minutes] = time.split(":").map(Number);
  const parsed = new Date(baseDate);
  parsed.setHours(hours, minutes, 0, 0);
  return parsed;
}

handleBlockedUrls();
