#!/usr/bin/env python3
"""Apply the reviewed WHESVC article improvements to KCROC's blogPosts.ts.

Run from the repository root:
    python apply_whesvc_guide_upgrade.py

The script refuses to write if the expected original text is not present, so it
will not silently overwrite a differently edited article.
"""

from pathlib import Path
import sys

TARGET = Path("app/frontend/src/constants/blogPosts.ts")

if not TARGET.exists():
    sys.exit(f"ERROR: {TARGET} not found. Run this script from the KCROC repository root.")

source = TARGET.read_text(encoding="utf-8")
updated = source

replacements = [
    (
        '''        "text": "Microsoft assigned CVE-2025-59241, a local privilege-escalation vulnerability affecting Windows Health and Optimized Experiences on certain Windows 11 builds. The vulnerability was rated CVSS 7.8 High, and the affected versions were subsequently addressed through Microsoft's security servicing."
      },''',
        '''        "text": "Microsoft assigned CVE-2025-59241 to a local privilege-escalation vulnerability in Windows Health and Optimized Experiences Service. The flaw involved improper link resolution before file access (CWE-59) and was rated CVSS 7.8 High. The published affected Windows 11 branches include versions 24H2 and 25H2; the vulnerability record lists fixed baseline builds 26100.6899 and 26200.6899 respectively. These are historical minimum fix levels, not a recommendation to install an old build: install the latest applicable cumulative security update for your Windows version. Official advisory: https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-59241"
      },
      {
        "type": "h3",
        "text": "How to check WHESVC without disabling it",
        "id": "check-whesvc-safely"
      },
      {
        "type": "paragraph",
        "text": "Start by checking your Windows version and installing all applicable updates in Settings → Windows Update. The existence of a service name, a temporary folder, or a diagnostic trace is not by itself evidence of spyware or an active vulnerability."
      },
      {
        "type": "list",
        "ordered": true,
        "items": [
          "Press Win + R, enter services.msc, and press Enter. Look for Windows Health and Optimized Experiences if it is listed. Inspect the status; do not change Startup type just to experiment.",
          "For a read-only check, open PowerShell and run: Get-CimInstance Win32_Service -Filter \\"Name='whesvc'\\" | Select-Object Name, DisplayName, State, StartMode",
          "If the command returns no service, do not create it manually or download replacement files. Service availability and configuration can vary by Windows build and policy; check Windows Update and investigate the specific device configuration first.",
          "If you are investigating high resource use, note the process, CPU/disk/network activity, timestamp, and any recent update or driver change before changing a service."
        ]
      },
      {
        "type": "paragraph",
        "text": "Microsoft's guidance explains that Windows connected experiences can require service data to deliver the related feature, and that diagnostic-data collection is governed by Windows settings and applicable policy. Read Microsoft's overview: https://learn.microsoft.com/en-us/windows/privacy/required-service-data"
      },'''
    ),
    (
        '''          {
            "question": "What is WHESVC in Windows 11?",
            "answer": "WHESVC is the service name associated with Windows Health and Optimized Experiences. It is a legitimate Microsoft Windows component. The service also has a documented security history, including CVE-2025-59241, which is another reason to keep Windows properly updated."
          },''',
        '''          {
            "question": "What is WHESVC in Windows 11?",
            "answer": "WHESVC is the service name associated with Windows Health and Optimized Experiences. It is a legitimate Windows component, not proof of malware. It has a documented local privilege-escalation vulnerability, CVE-2025-59241, so keep Windows on a currently supported, fully patched build."
          },
          {
            "question": "How do I check whether WHESVC is running?",
            "answer": "Open services.msc and look for Windows Health and Optimized Experiences. For a read-only PowerShell check, run Get-CimInstance Win32_Service -Filter \\"Name='whesvc'\\" | Select-Object Name, DisplayName, State, StartMode. Do not change its startup type simply because you are checking it."
          },
          {
            "question": "Which Windows builds fixed CVE-2025-59241?",
            "answer": "The vulnerability record lists fixed baseline builds 26100.6899 for Windows 11 24H2 and 26200.6899 for Windows 11 25H2. These are minimum historical fix levels; install the latest cumulative security update applicable to your version rather than targeting those old build numbers."
          },'''
    ),
    (
        '''    "date": "2026-09-05",
    "author": "KCROC Technical Team — Windows & Hardware Troubleshooting",''',
        '''    "date": "2026-09-05",
    "technicalReviewDate": "2026-10-05",
    "author": "KCROC Technical Team — Windows & Hardware Troubleshooting",'''
    ),
    (
        '''    "seoTitle": "Windows 11 Background Services to Audit in 2026",''',
        '''    "seoTitle": "WHESVC Explained: Windows Health and Optimized Experiences",
    "seoDescription": "What is WHESVC in Windows 11? Learn what Windows Health and Optimized Experiences does, how to check its status, CVE-2025-59241, and safer troubleshooting.",'''
    ),
]

for old, new in replacements:
    count = updated.count(old)
    if count != 1:
        sys.exit(
            "ERROR: Expected to find one exact original text block, "
            f"found {count}. No file was changed. First text: {old[:120]!r}"
        )
    updated = updated.replace(old, new, 1)

required = [
    "check-whesvc-safely",
    "CVE-2025-59241",
    "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-59241",
    "https://learn.microsoft.com/en-us/windows/privacy/required-service-data",
    '"technicalReviewDate": "2026-10-05"',
    '"seoTitle": "WHESVC Explained: Windows Health and Optimized Experiences"',
]
for needle in required:
    if needle not in updated:
        sys.exit(f"ERROR: Post-edit validation failed for {needle!r}. No file was changed.")

if updated == source:
    sys.exit("No changes needed; the target file already contains these updates.")

TARGET.write_text(updated, encoding="utf-8")
print(f"Updated {TARGET}")
print("Preserved the article slug and route; added official source links, safe status-check steps, WHESVC FAQs, and SEO metadata.")
print("Next: run pnpm run build from app/frontend, review the diff, then commit and deploy.")
