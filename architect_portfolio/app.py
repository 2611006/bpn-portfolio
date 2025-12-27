from flask import Flask
app = Flask(__name__)

# ... your routes ...

# This part is important for local testing, 
# but Vercel will ignore it and use the 'app' object directly
if __name__ == "__main__":
    app.run()
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

projects = [
    {
        "title": "Modern Villa",
        "category": "Architecture",
        "desc": "Minimalist villa with natural light",
        "image": "villa.jpg"
    },
    {
        "title": "Luxury Interior",
        "category": "Interior",
        "desc": "Warm interiors with premium finish",
        "image": "interior.jpg"
    },
    {
        "title": "Commercial Building",
        "category": "Civil",
        "desc": "Structural planning and execution",
        "image": "civil.jpg"
    }
]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/projects")
def project_page():
    return render_template("projects.html", projects=projects)

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        message = request.form["message"]
        print(name, email, message)
        return redirect(url_for("home"))
    return render_template("contact.html")

if __name__ == "__main__":
    app.run(debug=True)

