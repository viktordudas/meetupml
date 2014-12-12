﻿/*
To collect end-user usage analytics about your application,
insert the following script into each page you want to track.
Place this code immediately before the closing </head> tag,
and before any other scripts. Your first data will appear
automatically in just a few seconds.
*/

var appInsights = window.appInsights|| function (config) {
	function s(config) {
		t[config] = function () {
			var i = arguments;
			t.queue.push(function () {
				t[config].apply(t, i);
			});
		};
	} 
	var t = { config: config }, r = document, f = window, e = "script", o = r.createElement(e), i, u;
	for (o.src = config.url || "//az416426.vo.msecnd.net/scripts/a/ai.0.js", r.getElementsByTagName(e)[0].parentNode.appendChild(o), t.cookie = r.cookie, t.queue = [], i = ["Event", "Exception", "Metric", "PageView", "Trace"]; i.length;) {
		s("track" + i.pop());
	}
	return config.disableExceptionTracking || (i = "onerror", s("_" + i), u = f[i], f[i] = function (config, r, f, e, o) {
		var s = u && u(config, r, f, e, o);
		return s !== !0 && t["_" + i](config, r, f, e, o), s;
	}), t;
}({
	instrumentationKey: "6c3d2867-b9ce-4451-854a-9d3c8afa581a"
});

window.appInsights = appInsights;
appInsights.trackPageView();