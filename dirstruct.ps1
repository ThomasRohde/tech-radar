$rootPath = Get-Location
$rootName = Split-Path $rootPath -Leaf

# Directories to exclude from file listing and recursion
$excludeDirs = @('node_modules', 'dist', 'build', '.git')

function Get-TreeStructure($path, $indent = '') {
    $items = Get-ChildItem -Path $path -Force | Sort-Object { $_.PSIsContainer }, Name
    $output = @()

    foreach ($item in $items) {
        $relativePath = $item.FullName.Substring($rootPath.Path.Length).TrimStart('\')
        $isExcluded = $excludeDirs | Where-Object { $relativePath -split '\\' -contains $_ }

        $line = "$indent- $($item.Name)"
        if ($item.PSIsContainer) {
            $line += "/"
        }
        $output += $line

        if ($item.PSIsContainer -and (-not $isExcluded)) {
            $output += Get-TreeStructure -path $item.FullName -indent "  $indent"
        }
    }

    return $output
}

$output = @"
# Project Structure: $rootName


- $rootName/
$((Get-TreeStructure -path $rootPath -indent '  ') -join "`n")

"@

$outputFile = 'Project structure.md'
$output | Out-File -FilePath $outputFile -Encoding UTF8

@"
Directory structure has been exported to '$outputFile'
Excluded directories: $($excludeDirs -join ', ')
Content preview of '$outputFile':
$((Get-Content $outputFile | Select-Object -First 20) -join "`n")
"@ | Write-Host