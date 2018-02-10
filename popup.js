// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

// function setAlarm(event) {
//   let minutes = parseFloat(event.target.value);
//   chrome.browserAction.setBadgeText({text: 'ON'});
//   chrome.alarms.create({periodInMinutes: minutes});
//   chrome.storage.sync.set({minutes: minutes});
//   window.close();
// }

function setSliderAlarm(event) {
  let minutes = parseFloat(event.target.value);
  chrome.browserAction.setBadgeText({text: 'ON'});
  chrome.alarms.create({periodInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});
  document.getElementById('sliderText').innerHTML = `Every ${minutes} minutes`;
}

function setSliderText() {
  chrome.storage.sync.get('minutes', (item) => {
    const sliderText = document.getElementById('sliderText');
    const slider = document.getElementById('slider');
    sliderText.innerHTML = `Every ${item.minutes} minutes`;
    slider.value = item.minutes;
  });
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}

document.getElementById('slider').addEventListener('change', setSliderAlarm);
setSliderText(); // whenever user opens popup
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
