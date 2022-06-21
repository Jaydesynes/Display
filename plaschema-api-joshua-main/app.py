from flask import Flask, request, jsonify

app = Flask(__name__)


formal_subs = {
    "MDA": [
        "Ministry of Agriculture and Natural Resources",
        "Ministry of Budget and Economic Planning",
        "Ministry of Commerce and Industries",
        "Ministry of Finance",
        "Ministry of Education",
        "Ministry of Health",
        "Ministry of Housing",
        "Ministry of Environment",
        "Ministry of Information",
        "Ministry of Justice",
        "Ministry of Science and Technology",
        "Ministry of Transport"
    ],
    "LGA": [
        "Jos East",
        "Jos North",
        "Jos South",
        "Langtang North",
        "Langtang South",
        "Kanam",
        "Kanke",
        "Bokkos",
        "Bassa",
        "Barkin Ladi",
        "Mikang",
        "Mangu",
        "Pankshin",
        "Quaanpan",
        "Riyom",
        "Shendam",
        "Wase"
    ],
    "OPS": []
}
informal_subs = {
    "Sponsored": [],
    "Association": [],
    "General Public": []
    }


equity_subs = ["BHCPF", "PLSEF"]





@app.route("/")
def home():
    return jsonify({"hello":"world"})

@app.route("/categories")
def categories():
    

    category_list = {
        "Formal Sector": formal_subs,
        "Informal Sector": informal_subs,
        "Equity Sector": equity_subs
    }
    return jsonify(category_list)


@app.route("/main-categories")
def categories():
    

    category_list = [
        "Formal Sector",
        "Informal Sector",
        "Equity Sector"
    ]
    return jsonify(category_list)


if __name__ == "__main__":
    app.run(debug=True)