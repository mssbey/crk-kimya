$ErrorActionPreference = "Stop"
# Statik export build (API route'suz, Apache icin)
Write-Host "Statik export build basliyor..." -ForegroundColor Cyan
npm run build:export
if (-not $?) { Write-Error "Build basarisiz."; exit 1 }
if (-not (Test-Path .\out)) {
    Write-Error "out klasoru bulunamadi."
    exit 1
}
$dest = Join-Path $env:USERPROFILE "Desktop\crk-kimya-httpdocs"
if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
Copy-Item -Recurse -Force .\out $dest

$htaccess = @'
# CRK Kimya - shared hosting (Plesk/cPanel) httpdocs

DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^(.*)$ $1/index.html [L]
</IfModule>

ErrorDocument 404 /404.html

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json application/xml image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType image/png "access plus 6 months"
  ExpiresByType image/jpeg "access plus 6 months"
  ExpiresByType image/webp "access plus 6 months"
  ExpiresByType image/svg+xml "access plus 6 months"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType application/pdf "access plus 30 days"
  ExpiresByType video/mp4 "access plus 30 days"
</IfModule>

<IfModule mod_mime.c>
  AddType application/javascript .mjs
</IfModule>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
'@
Set-Content -Path (Join-Path $dest ".htaccess") -Value $htaccess -Encoding UTF8

$sizeMB = [Math]::Round((Get-ChildItem $dest -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB, 2)
$count = (Get-ChildItem $dest -Recurse -File).Count
Write-Host ""
Write-Host "OK -> $dest"
Write-Host "Total: $sizeMB MB / $count files"
Write-Host ""
Write-Host "Top-level:"
Get-ChildItem $dest -Force | Sort-Object Name | Select-Object Mode, Length, Name | Format-Table -AutoSize
