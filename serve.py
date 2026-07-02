#!/usr/bin/env python3
"""
Serveur local ParkTracker.
Reproduit le comportement de GitHub Pages :
- sert index.html pour "/"
- sert les URLs propres sans .html  (/assistance -> assistance.html)
- renvoie 404.html pour les pages inconnues
Lance : py serve.py   (ou double-clic sur "Lancer-le-site.bat")
"""
import http.server
import socketserver
import socket
import os
import threading
import webbrowser
from urllib.parse import urlparse, unquote

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)


def find_free_port(start=8000, end=8025):
    for p in range(start, end):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("127.0.0.1", p))
                return p
            except OSError:
                continue
    return start


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self._route(head=False)

    def do_HEAD(self):
        self._route(head=True)

    def _route(self, head):
        rel = unquote(urlparse(self.path).path).lstrip("/")

        candidates = []
        if rel == "" or rel.endswith("/"):
            candidates.append(os.path.join(rel, "index.html"))
        else:
            candidates.append(rel)
            # URL propre sans extension -> essaie .html puis /index.html
            if "." not in os.path.basename(rel):
                candidates.append(rel + ".html")
                candidates.append(os.path.join(rel, "index.html"))

        for c in candidates:
            fp = os.path.normpath(os.path.join(ROOT, c))
            if fp.startswith(ROOT) and os.path.isfile(fp):
                return self._send(fp, head)

        # Page introuvable -> 404.html
        fp404 = os.path.join(ROOT, "404.html")
        if os.path.isfile(fp404):
            return self._send(fp404, head, status=404)
        self.send_error(404)

    def _send(self, fp, head=False, status=200):
        try:
            with open(fp, "rb") as f:
                data = f.read()
        except OSError:
            self.send_error(404)
            return
        self.send_response(status)
        self.send_header("Content-Type", self.guess_type(fp))
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        if not head:
            self.wfile.write(data)

    def log_message(self, fmt, *args):
        pass  # silence


def main():
    port = find_free_port()
    url = f"http://localhost:{port}/"
    threading.Timer(0.8, lambda: webbrowser.open(url)).start()
    with socketserver.ThreadingTCPServer(("127.0.0.1", port), Handler) as httpd:
        print("=" * 50)
        print("  ParkTracker - serveur local demarre")
        print(f"  Ouvre : {url}")
        print("  (ferme cette fenetre ou Ctrl+C pour arreter)")
        print("=" * 50)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServeur arrete.")


if __name__ == "__main__":
    main()
