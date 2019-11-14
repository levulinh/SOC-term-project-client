import React from 'react';
import { Markup } from 'interweave';
import { AUTH_TOKEN, USER_INFO } from "./constants";

function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return "just now";
  }

  if (elapsed < milliSecondsPerMinute) {
    return "less than 1 min ago";
  } else if (elapsed < milliSecondsPerHour) {
    return Math.round(elapsed / milliSecondsPerMinute) + " min ago";
  } else if (elapsed < milliSecondsPerDay) {
    return Math.round(elapsed / milliSecondsPerHour) + " h ago";
  } else if (elapsed < milliSecondsPerMonth) {
    return Math.round(elapsed / milliSecondsPerDay) + " days ago";
  } else if (elapsed < milliSecondsPerYear) {
    return Math.round(elapsed / milliSecondsPerMonth) + " mo ago";
  } else {
    return Math.round(elapsed / milliSecondsPerYear) + " years ago";
  }
}

function timeDifferenceForDate(date) {
  const now = new Date().getTime();
  const updated = new Date(date).getTime();
  return timeDifference(now, updated);
}

function isAuthenticated() {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  if (authToken) return true;
  return false;
}

function getLocalUserInfo() {
  const userString = localStorage.getItem(USER_INFO);
  return JSON.parse(userString);
}

function renderContentText(content) {
  let newContent = content;
  let pattern = /\B@[a-z0-9_-]+/gi;
  const mentions = content.match(pattern);
  if (mentions == null) return content;
  mentions.forEach(m => {
    newContent = newContent.replace(new RegExp(m, 'g'), `<a href="/u/${m.substring(1)}">${m}</a>`)
  })

  return <Markup content={newContent} />;
}


export { timeDifferenceForDate, isAuthenticated, getLocalUserInfo, renderContentText };
