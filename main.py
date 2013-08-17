import tornado.ioloop
import tornado.web
import os.path
import time
from collections import Counter

class MainHandler(tornado.web.RequestHandler):
    def post(self):
        input_text = self.get_argument("text")
        word_list = Counter(input_text.split()).most_common()
        self.write({"word_dict": dict(word_list)})  
        
    def get(self):
        self.render("index.html")       


def main():
    application = tornado.web.Application([
        (r"/", MainHandler),
    ],
    template_path=os.path.join(os.path.dirname(__file__), "templates"),
    static_path=os.path.join(os.path.dirname(__file__), "static"),)
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()