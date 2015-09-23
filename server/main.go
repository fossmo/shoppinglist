package shoppinglist

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"text/template"

	"github.com/gorilla/mux"
)

func Start() {
	xhttp := mux.NewRouter()
	fmt.Println("The server has started on port 3009...")
	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("server/public"))))

	xhttp.HandleFunc("/111server/public/wp_bundle.js", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Har truffet handler........")
		director := func(req *http.Request) {
			req = r
			req.URL.Scheme = "http"
			req.URL.Host = "localhost:8080"
		}
		proxy := &httputil.ReverseProxy{Director: director}
		w.Header().Set("Access-Control-Allow-Origin", "localhost:8080")
		w.Header().Set("Access-Control-Allow-Headers", "X-Requested-With")

		proxy.ServeHTTP(w, r)

	})

	xhttp.HandleFunc("/server/public/wp_bundle.js", ProxyFunc)

	xhttp.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		temp := template.New("index.html")
		temp, _ = temp.ParseFiles("server/public/index.html")
		temp.Execute(w, nil)
	})

	http.Handle("/", xhttp)
	log.Fatal(http.ListenAndServe(":3009", nil))
}

func ProxyFunc(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Er her inne....")
	u, err := url.Parse("http://localhost:8080")
	if err == nil {
		proxy := httputil.NewSingleHostReverseProxy(u)
		proxy.Transport = &myTransport{}
		proxy.ServeHTTP(w, r)
	} else {
		w.Write([]byte(err.Error()))
	}
}

type myTransport struct {
	// Uncomment this if you want to capture the transport
	CapturedTransport http.RoundTripper
}

func (t *myTransport) RoundTrip(request *http.Request) (*http.Response, error) {
	response, err := http.DefaultTransport.RoundTrip(request)
	// or, if you captured the transport
	// response, err := t.CapturedTransport.RoundTrip(request)

	// The httputil package provides a DumpResponse() func that will copy the
	// contents of the body into a []byte and return it. It also wraps it in an
	// ioutil.NopCloser and sets up the response to be passed on to the client.
	body, err := httputil.DumpResponse(response, true)
	if err != nil {
		// copying the response body did not work
		return nil, err
	}

	// You may want to check the Content-Type header to decide how to deal with
	// the body. In this case, we're assuming it's text.
	log.Print(string(body))
	//response.Header.Add("Access-Control-Allow-Origin", "http://localhost:3009")

	return response, err
}
