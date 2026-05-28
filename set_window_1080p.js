// set_window_1080p.js
//
// WHY:
//   When recording a screen capture to document app development with an AI
//   assistant, having the window at a standard 1080p size and anchored to a
//   fixed corner ensures the recording has a clean, consistent frame — no
//   awkward crops or misaligned regions between takes.
//
// WHAT:
//   Resizes the currently focused window to 1920x1080 and snaps it to the
//   bottom-right corner of whichever monitor it is currently on.
//
// USAGE:
//   osascript -l JavaScript set_window_1080p.js
//
// REQUIREMENTS:
//   macOS Automation permission — on first run, approve the prompt:
//   "Allow <your terminal> to control System Events"
//   (System Settings → Privacy & Security → Automation)

ObjC.import('AppKit');

var screens = $.NSScreen.screens;
var result = [];

// primary screen in Cocoa always has its bottom-left at (0,0)
var primaryHeight = 0;
for (var i = 0; i < screens.count; i++) {
    var f = screens.objectAtIndex(i).frame;
    if (f.origin.x === 0 && f.origin.y === 0) {
        primaryHeight = f.size.height;
        break;
    }
}

for (var i = 0; i < screens.count; i++) {
    var screen = screens.objectAtIndex(i);
    var frame = screen.frame;
    result.push(
        "Monitor " + (i + 1) + ": " +
        frame.size.width + " x " + frame.size.height +
        " at (" + frame.origin.x + ", " + frame.origin.y + ")"
    );
}

var se = Application("System Events");
var frontApp = se.processes.whose({ frontmost: true })[0];
var frontWindow = frontApp.windows[0];
var pos = frontWindow.position();
var size = frontWindow.size();
var windowX = pos[0];

// find which monitor the window is on
var targetFrame = null;
var monitorIndex = -1;
for (var i = 0; i < screens.count; i++) {
    var frame = screens.objectAtIndex(i).frame;
    if (windowX >= frame.origin.x && windowX < frame.origin.x + frame.size.width) {
        targetFrame = frame;
        monitorIndex = i + 1;
        break;
    }
}

// resize to 1080p and place at bottom-right of current monitor
// y conversion: Cocoa uses bottom-left origin, System Events uses top-left origin
var newW = 1920;
var newH = 1080;
var newX = targetFrame.origin.x + targetFrame.size.width - newW;
var newY = primaryHeight - targetFrame.origin.y - newH;

frontWindow.size = [newW, newH];
frontWindow.position = [newX, newY];

result.push("Window was: Position (" + pos[0] + ", " + pos[1] + ")  Size: " + size[0] + " x " + size[1]);
result.push("Window is on Monitor " + monitorIndex);
result.push("Moved to bottom-right at (" + newX + ", " + newY + ") with size 1920x1080");

result.join("\n");
