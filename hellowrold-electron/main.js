const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }));

    win.on("closed", () => {
        win = null;
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    // On macOS, apps typically stay active until the user quits explicitly
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS, recreate window when clicking the dock icon
    if (win === null) {
        createWindow();
    }
});

