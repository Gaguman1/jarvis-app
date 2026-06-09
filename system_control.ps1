param(
    [string]$action = ""
)

# Compile a tiny C# snippet to access the native user32.dll for key presses
$code = @"
using System.Runtime.InteropServices;
public class MediaKeys {
    [DllImport("user32.dll")]
    public static extern void keybd_event(byte bVk, byte bScan, int dwFlags, int dwExtraInfo);
    
    // Virtual Key Codes
    public const byte VK_VOLUME_MUTE = 0xAD;
    public const byte VK_VOLUME_DOWN = 0xAE;
    public const byte VK_VOLUME_UP = 0xAF;
    public const byte VK_MEDIA_NEXT_TRACK = 0xB0;
    public const byte VK_MEDIA_PREV_TRACK = 0xB1;
    public const byte VK_MEDIA_PLAY_PAUSE = 0xB3;
}
"@

# Only add type if it hasn't been added in this PS session (which is always true since we launch a new process, but good practice)
try {
    Add-Type -TypeDefinition $code -ErrorAction Stop
} catch {
    # Ignore if already exists
}

switch ($action.ToLower()) {
    "playpause" { [MediaKeys]::keybd_event([MediaKeys]::VK_MEDIA_PLAY_PAUSE, 0, 0, 0) }
    "play"      { [MediaKeys]::keybd_event([MediaKeys]::VK_MEDIA_PLAY_PAUSE, 0, 0, 0) }
    "pause"     { [MediaKeys]::keybd_event([MediaKeys]::VK_MEDIA_PLAY_PAUSE, 0, 0, 0) }
    "volup"     { [MediaKeys]::keybd_event([MediaKeys]::VK_VOLUME_UP, 0, 0, 0) }
    "voldown"   { [MediaKeys]::keybd_event([MediaKeys]::VK_VOLUME_DOWN, 0, 0, 0) }
    "mute"      { [MediaKeys]::keybd_event([MediaKeys]::VK_VOLUME_MUTE, 0, 0, 0) }
    "next"      { [MediaKeys]::keybd_event([MediaKeys]::VK_MEDIA_NEXT_TRACK, 0, 0, 0) }
    "prev"      { [MediaKeys]::keybd_event([MediaKeys]::VK_MEDIA_PREV_TRACK, 0, 0, 0) }
    default     { Write-Host "Unknown action: $action" }
}
