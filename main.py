#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
import os

class MainHandler(webapp.RequestHandler):
    def get(self):
 #       temp = { 'version': os.environ['CURRENT_VERSION_ID'] }
		# prepare content-type response header
		self.response.headers['Content-Type'] = 'text/html; charset=UTF-8'
		user = users.get_current_user()
        
		if user:
			self.response.out.write(template.render(os.path.join(os.path.dirname(__file__), 'html5.html'), { 'username' : user.nickname()}))
		else:
			self.response.out.write(template.render(os.path.join(os.path.dirname(__file__), 'html5.html'), {}))

#        self.response.out.write(os.path.join(os.path.dirname(__file__), 'uki.html'))
            
class PrintEnvironmentHandler(webapp.RequestHandler):
    def get(self):
        for name in os.environ.keys():
            self.response.out.write("%s = %s<br />\n" % (name, os.environ[name]))

def main():
    application = webapp.WSGIApplication([('/', MainHandler)], debug=False)
    
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()
