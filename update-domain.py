#!/usr/bin/env python3
"""
Usage:
  python3 update-domain.py https://yourusername.github.io/plumbsquare
  OR
  python3 update-domain.py https://yourcustomdomain.com
Updates all canonical links, OpenGraph tags, JSON-LD schemas, robots.txt, and sitemap.xml!
"""
import os, sys, re

if len(sys.argv) < 2:
    print("Usage: python3 update-domain.py https://your-domain-or-github-pages-url")
    sys.exit(1)

new_url = sys.argv[1].rstrip("/")
root_dir = os.path.dirname(os.path.abspath(__file__))
old_pattern = re.compile(r"https://plumbsquare\.github\.io")

count = 0
for dirpath, _, filenames in os.walk(root_dir):
    for fn in filenames:
        if fn.endswith((".html", ".xml", ".txt")):
            p = os.path.join(dirpath, fn)
            with open(p, "r", encoding="utf-8") as f:
                txt = f.read()
            if "https://plumbsquare.github.io" in txt:
                txt = old_pattern.sub(new_url, txt)
                with open(p, "w", encoding="utf-8") as f:
                    f.write(txt)
                count += 1
print(f"Updated {count} files to canonical base URL: {new_url}")
