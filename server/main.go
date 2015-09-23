package shoppinglist

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"text/template"

	"github.com/gorilla/mux"
)

func Start() {
	xhttp := mux.NewRouter()
	fmt.Println("The server has started on port 3009...")
	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("server/public"))))

	xhttp.HandleFunc("/wp_bundle.js", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Loading development bundle.")
		director := func(req *http.Request) {
			req = r
			req.URL.Scheme = "http"
			req.URL.Host = "localhost:8080"
		}
		proxy := &httputil.ReverseProxy{Director: director}
		proxy.ServeHTTP(w, r)

	})

	xhttp.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		temp := template.New("index.html")
		temp, _ = temp.ParseFiles("server/public/index.html")
		temp.Execute(w, nil)
	})

	http.Handle("/", xhttp)
	log.Fatal(http.ListenAndServe(":3009", nil))
}
