# Change this path to the location of your Memurai installation
$memuraiPath = "C:\Program Files\Memurai\memurai.exe"

# Start Memurai and keep it running in the foreground
Start-Process -FilePath $memuraiPath -Wait

# The script will wait for the Memurai process to exit
Write-Host "Memurai is running. Press Ctrl+C to stop it."
