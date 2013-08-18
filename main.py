import tornado.ioloop
import tornado.web
import os.path
import time
from collections import Counter


class MainHandler(tornado.web.RequestHandler):
    """
    Main handler for homepage. Handles both get and post.
    """
    def post(self):
        #get the post data
        input_text = self.get_argument("text")
        #use the Counter collection to get the list of word frequencies
        word_list = Counter(input_text.split()).most_common()
        #write the list to the response
        self.write({"word_list": word_list})  
        
    def get(self):
        self.render("index.html")       


def main():
    """
    Starting point of application. Defines and start it.
    """
    #set the template handlers
    application = tornado.web.Application([
        (r'/(favicon.ico)', tornado.web.StaticFileHandler, {"path": "/favicon.ico"}),
        (r"/", MainHandler),
    ],
    template_path=os.path.join(os.path.dirname(__file__), "templates"),
    static_path=os.path.join(os.path.dirname(__file__), "static"),)
    
    #start the application on port 8888
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()