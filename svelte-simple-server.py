from http.server import HTTPServer, BaseHTTPRequestHandler
import pathlib

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.path = "/build" + self.path 
        path = pathlib.Path(self.path)
        if path.suffix == '': 
            self.path = '/build/200.html'
            path = pathlib.Path(self.path)
        try:
            mime = extToMime(path.suffix)
            print(f"reading {self.path[1:]}")
            file_to_open = open(self.path[1:]).read()
            self.send_response(200)
            self.send_header('Content-type', mime)
            self.end_headers()
            self.wfile.write(bytes(file_to_open, 'utf-8'))
        except:
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b'404 - Not Found')

def extToMime(extension):
    mime = 'text/plain'
    match extension[1:]:
        case 'css':
            mime = 'text/css'
        case 'html':
            mime = 'text/html'
        case 'js':
            mime = 'text/javascript'
    return mime

httpd = HTTPServer(('', 8000), SimpleHTTPRequestHandler)
print(f'http://{httpd.server_address[0]}:{httpd.server_port}')
httpd.serve_forever()
