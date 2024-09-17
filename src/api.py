
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src/service-app')))

import rest

if __name__ == '__main__':
    rest.app.run(debug=True, host="0.0.0.0", port=5000)

