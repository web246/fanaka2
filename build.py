#!/usr/bin/env python3
"""Fanaka Noblewealth Advisory | static site generator.  Run: python3 build.py
Edit the CONFIG block and any T("English","Kiswahili") text, then re-run to rebuild every page."""
import os, html

ROOT = os.path.dirname(os.path.abspath(__file__))
# ---------------- CONFIG (set what you have; empty values are simply not shown) ----------------
EMAIL = "info@fanakanoblewealth.co.ke"
PHONE = ""            # e.g. "+254 7xx xxx xxx"  (shows Call buttons + footer line when set)
WHATSAPP = ""         # e.g. "2547xxxxxxxx"      (shows the WhatsApp button when set)
ADDRESS = "Nairobi, Kenya"
HOURS = ("Mon–Fri, 8:00–17:00 EAT", "Jumatatu–Ijumaa, saa 2:00 asubuhi–11:00 jioni")
FORM_ENDPOINT = ""    # Formspree/Netlify URL; when empty, forms open the visitor's email app addressed to EMAIL
DOMAIN = "https://www.fanakanoblewealth.co.ke"
UPDATED = "20 October 2026"
# ------------------------------------------------------------------------------------------------

def esc(s): return html.escape(s, quote=True)
def T(en, sw=None, tag="span", cls="", extra=""):
    a = f' data-sw="{esc(sw)}"' if sw else ""
    c = f' class="{cls}"' if cls else ""
    return f"<{tag}{c}{a}{extra}>{en}</{tag}>"
def PH(en, sw): return f'placeholder="{esc(en)}" data-sw-ph="{esc(sw)}"'
tel = PHONE.replace(" ", "")

ICONS = {
 "pension": "M12 3a9 9 0 019 9H3a9 9 0 019-9zM12 12v7a2 2 0 004 0", "admin": "M6 3h9l4 4v14H6zM9 12h7M9 16h7",
 "umbrella": "M3 12a9 9 0 0118 0zM12 12v6a2 2 0 01-4 0", "person": "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-6 8-6s8 2 8 6",
 "globe": "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
 "coins": "M12 4c4 0 7 1.3 7 3s-3 3-7 3-7-1.3-7-3 3-3 7-3zM5 7v5c0 1.7 3 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3 3 7 3s7-1.3 7-3v-5",
 "key": "M8 15a4 4 0 110-8 4 4 0 010 8zM11 11h10M18 11v4", "train": "M3 9l9-5 9 5-9 5zM7 12v5c3 2 7 2 10 0v-5",
 "shield": "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z", "building": "M4 21V7l8-4 8 4v14M9 21v-6h6v6",
 "car": "M5 16l1.5-6h11L19 16M4 16h16v3H4zM7 19v1M17 19v1", "home": "M12 3l9 7v11H3V10zM9 21v-7h6v7",
 "trend": "M3 17l6-6 4 4 8-8M15 7h6v6", "bars": "M5 20V10M12 20V4M19 20v-8",
 "dollar": "M12 3v18M16 7c-1-1.5-8-2-8 1.5S16 11 16 14.5 9 18 7.5 16.5", "scales": "M12 3v18M5 7h14M5 7l-3 7a3.5 3.5 0 006 0zM19 7l-3 7a3.5 3.5 0 006 0z",
 "people": "M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-3 3-5 6-5s6 2 6 5M17 11a3 3 0 100-6M17 15c3 0 4 2 4 5",
 "help": "M12 3a9 9 0 100 18 9 9 0 000-18zM9.5 9.5a2.5 2.5 0 115 .5c0 1.5-2.5 2-2.5 3.5M12 17v.5",
 "heart": "M12 21s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 10c0 6-8 11-8 11z", "compass": "M12 3a9 9 0 100 18 9 9 0 000-18zM15.5 8.5l-2 5-5 2 2-5z",
 "doc": "M6 3h9l4 4v14H6zM9 11h7M9 15h5", "pie": "M12 3v9h9a9 9 0 11-9-9zM15 3a9 9 0 016 6h-6z",
}
def ico(k): return f'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="{ICONS[k]}"/></svg>'
LOGO = '<img class="brand-logo" src="{r}assets/img/logo.png" alt="Fanaka Noblewealth Advisory">'
BRAND = f'<a class="brand" href="{{r}}index.html" aria-label="Fanaka Noblewealth Advisory">{LOGO}</a>'
BOOK = ("Book a Free Consultation", "Weka Miadi ya Ushauri Bila Malipo")
def btn(href, t, cls=""): return f'<a class="btn {cls}" href="{href}">{T(*t)}<span class="ar">&rarr;</span></a>'

# ------------------------------------------------------------------ CATEGORIES
CATS = {
 "pension": dict(name=("Pension", "Pensheni"), c1="#0B2A5C", c2="#1D5FAE", icon="pension",
  blurb=("Build a retirement income you can count on.", "Jenga kipato cha kustaafu unachoweza kukitegemea."),
  cta=("Start Planning My Retirement", "Anza Kupanga Kustaafu Kwangu"),
  who=("Employees, employers, the self-employed and Kenyans abroad who are planning for life after work.", "Waajiriwa, waajiri, waliojiajiri na Wakenya ughaibuni wanaopanga maisha baada ya kazi."),
  ben=[("Clear projections of the income you could retire on", "Makadirio wazi ya kipato unachoweza kustaafu nacho"), ("Tax-efficient contribution planning", "Mipango ya michango inayopunguza kodi"),
       ("Professional administration and record keeping", "Usimamizi wa kitaalamu na utunzaji wa kumbukumbu"), ("Regular statements and ongoing guidance", "Taarifa za mara kwa mara na mwongozo endelevu")],
  faq=[("When should I start saving for retirement?", "Nianze lini kuweka akiba ya kustaafu?", "As early as you can. Time and compounding do most of the work, but starting later is still far better than not starting.", "Mapema iwezekanavyo. Muda na riba ya mkusanyiko hufanya kazi kubwa, lakini kuanza baadaye ni bora kuliko kutoanza."),
       ("Is NSSF enough?", "Je, NSSF inatosha?", "For most people it is a foundation, not the whole plan. We help you build on top of it.", "Kwa watu wengi ni msingi, si mpango mzima. Tunakusaidia kujenga juu yake.")]),
 "insurance": dict(name=("Insurance", "Bima"), c1="#0A5C46", c2="#0A1E42", icon="shield",
  blurb=("Protect your family, property and business.", "Linda familia, mali na biashara yako."), cta=("Get a Quote", "Pata Nukuu"),
  who=("Families, homeowners, drivers and businesses that want cover matched to their real risks.", "Familia, wamiliki wa nyumba, madereva na biashara zinazotaka bima inayolingana na hatari zao halisi."),
  ben=[("Cover compared across insurers, explained in plain words", "Bima inayolinganishwa kati ya kampuni na kuelezwa kwa maneno rahisi"), ("A review of gaps and overlaps in what you already have", "Mapitio ya mapengo na marudio katika bima uliyonayo"),
       ("Premiums that fit your budget", "Malipo yanayolingana na bajeti yako"), ("Help with claims when you need it most", "Msaada wa madai unapouhitaji zaidi")],
  faq=[("Will I be pushed to buy more cover?", "Nitalazimishwa kununua bima zaidi?", "No. We recommend only the cover you genuinely need.", "Hapana. Tunapendekeza bima unayoihitaji kweli tu."),
       ("Can you review my current policies?", "Mnaweza kukagua sera zangu za sasa?", "Yes. Share your policy documents and we will explain what is and is not covered.", "Ndiyo. Tuma nyaraka za sera zako nasi tutaeleza kinachofunikwa na kisichofunikwa.")]),
 "investments": dict(name=("Investments", "Uwekezaji"), c1="#10336A", c2="#9C7A2E", icon="trend",
  blurb=("Grow your money with funds built for every goal.", "Kuza pesa zako kwa mifuko inayofaa kila lengo."), cta=("Start Investing", "Anza Kuwekeza"),
  who=("Savers and investors, from first-time to experienced, who want a clear and disciplined approach.", "Wawekaji akiba na wawekezaji, wapya na wazoefu, wanaotaka mbinu wazi na yenye nidhamu."),
  ben=[("Funds matched to your goal, timeline and risk comfort", "Mifuko inayolingana na lengo, muda na hatari unayostahimili"), ("Start small and add whenever you choose", "Anza kidogo na ongeza wakati wowote"),
       ("Transparent fees explained before you invest", "Ada zinazoelezwa wazi kabla ya kuwekeza"), ("Regular reviews as markets and life change", "Mapitio ya mara kwa mara masoko na maisha yanapobadilika")],
  faq=[("Can I lose money?", "Je, naweza kupoteza pesa?", "Yes. All investments carry risk and returns are never guaranteed. We help you understand that risk before you invest.", "Ndiyo. Uwekezaji wote una hatari na faida haihakikishwi. Tunakusaidia kuelewa hatari hiyo kabla ya kuwekeza."),
       ("How much do I need to start?", "Nahitaji kiasi gani kuanza?", "Many funds accept modest starting amounts. We will recommend what suits your cash flow.", "Mifuko mingi inakubali kiasi kidogo cha kuanzia. Tutapendekeza kinachofaa mtiririko wako wa fedha.")]),
 "trustee": dict(name=("Corporate Trustee", "Mdhamini wa Kampuni"), c1="#0A1E42", c2="#0E8A62", icon="scales",
  blurb=("Governance, trusts and schemes handled with care.", "Utawala, trust na mipango inayoshughulikiwa kwa uangalifu."), cta=("Speak to a Specialist", "Zungumza na Mtaalamu"),
  who=("Employers, boards, families and founders who need independent, dependable stewardship.", "Waajiri, bodi, familia na waanzilishi wanaohitaji usimamizi huru na wa kutegemewa."),
  ben=[("Independent oversight that protects beneficiaries", "Usimamizi huru unaolinda walengwa"), ("Clear governance, reporting and compliance support", "Utawala, ripoti na usaidizi wa utiifu ulio wazi"),
       ("Structures designed to last for generations", "Miundo iliyoundwa kudumu vizazi vingi"), ("One accountable team for every stage", "Timu moja inayowajibika kwa kila hatua")],
  faq=[("What does a corporate trustee do?", "Mdhamini wa kampuni hufanya nini?", "A trustee holds and oversees assets on behalf of beneficiaries, acting independently and in their best interest.", "Mdhamini hushikilia na kusimamia mali kwa niaba ya walengwa, akitenda kwa uhuru na kwa manufaa yao."),
       ("Can you work with our lawyer or auditor?", "Mnaweza kufanya kazi na wakili au mkaguzi wetu?", "Yes. We coordinate with your advisers so everything stays consistent.", "Ndiyo. Tunashirikiana na washauri wako ili kila kitu kiwe thabiti.")]),
}
# (category, slug, icon, name EN/SW, description EN/SW)
SV = [
 ("pension","pension-administration","admin",("Pension Administration Services","Huduma za Usimamizi wa Pensheni"),("Day-to-day administration for your scheme: member records, contributions, benefit payments and statements, handled accurately and on time.","Usimamizi wa kila siku wa mpango wako: kumbukumbu za wanachama, michango, malipo ya mafao na taarifa, kwa usahihi na kwa wakati.")),
 ("pension","umbrella-fund","umbrella",("Umbrella Fund Solutions","Suluhisho za Mfuko wa Mwavuli"),("Give your staff a retirement scheme without building one from scratch. Join a shared umbrella structure with professional governance and lower running costs.","Wape wafanyakazi wako mpango wa kustaafu bila kuujenga kuanzia mwanzo. Jiunge na muundo wa pamoja wenye utawala wa kitaalamu na gharama ndogo.")),
 ("pension","personal-pension","person",("Personal Pension Plan","Mpango wa Pensheni Binafsi"),("A retirement plan in your own name. Contribute at your own pace, choose how it is invested and keep it with you whichever job or business you move to.","Mpango wa kustaafu kwa jina lako. Changia kwa kasi yako, chagua jinsi unavyowekezwa na uuendeleze popote utakapohamia kazini au kibiashara.")),
 ("pension","diaspora-fund","globe",("Diaspora & Expatriates Fund","Mfuko wa Wakenya Ughaibuni na Wageni"),("Build retirement savings back home while you work abroad. Contribute from wherever you live and plan your return with confidence.","Jenga akiba ya kustaafu nyumbani ukiwa unafanya kazi ughaibuni. Changia popote ulipo na upange kurudi kwako kwa uhakika.")),
 ("pension","income-drawdown","coins",("Income Drawdown Fund","Mfuko wa Kutoa Kipato Taratibu"),("Turn your retirement savings into a steady income. Keep your money invested while drawing a regular amount that suits your lifestyle.","Geuza akiba yako ya kustaafu kuwa kipato thabiti. Endelea kuwekeza pesa zako huku ukitoa kiasi cha kawaida kinachofaa mtindo wako wa maisha.")),
 ("pension","principal-officer","key",("Corporate Principal Officer","Afisa Mkuu wa Kampuni"),("An experienced principal officer for your retirement scheme, keeping you compliant with reporting duties and governance requirements.","Afisa mkuu mwenye uzoefu kwa mpango wako wa kustaafu, anayekuweka katika utiifu wa majukumu ya ripoti na mahitaji ya utawala.")),
 ("pension","corporate-trustee","scales",("Corporate Trustee","Mdhamini wa Kampuni"),("Independent trusteeship for retirement schemes. We hold assets for members, oversee managers and protect beneficiaries at every step.","Udhamini huru kwa mipango ya kustaafu. Tunashikilia mali kwa wanachama, kusimamia mameneja na kulinda walengwa kila hatua.")),
 ("pension","training-services","train",("Training Services","Huduma za Mafunzo"),("Practical workshops for trustees, boards and employees on retirement, money management and scheme governance, delivered in English or Kiswahili.","Warsha za vitendo kwa wadhamini, bodi na wafanyakazi kuhusu kustaafu, usimamizi wa pesa na utawala wa mipango, kwa Kiingereza au Kiswahili.")),
 ("insurance","personal-insurance","heart",("Personal Insurance","Bima ya Kibinafsi"),("Life, medical, personal accident and education cover chosen around your family, so a setback never becomes a financial crisis.","Bima ya maisha, afya, ajali binafsi na elimu iliyochaguliwa kulingana na familia yako, ili tukio baya lisigeuke janga la kifedha.")),
 ("insurance","corporate-insurance","building",("Corporate Insurance","Bima ya Kampuni"),("Protect your premises, stock, people and operations. We design a corporate cover programme that fits your industry and your budget.","Linda majengo, bidhaa, wafanyakazi na shughuli zako. Tunabuni mpango wa bima ya kampuni unaofaa sekta na bajeti yako.")),
 ("insurance","motor-insurance","car",("Comprehensive Motor Insurance","Bima Kamili ya Magari"),("Full cover for your car against accident, theft and damage to others. Compare insurers and get a quote without the legwork.","Bima kamili ya gari lako dhidi ya ajali, wizi na uharibifu kwa wengine. Linganisha kampuni na upate nukuu bila usumbufu.")),
 ("insurance","domestic-package","home",("Domestic Package Insurance","Bima ya Kifurushi cha Nyumbani"),("One policy for your home and belongings: building, contents, domestic staff and personal liability under a single, simple package.","Sera moja ya nyumba na mali zako: jengo, vitu vya ndani, wafanyakazi wa nyumbani na dhima binafsi katika kifurushi kimoja rahisi.")),
 ("investments","money-market-fund","coins",("Money Market Fund","Mfuko wa Soko la Fedha"),("Keep your cash working while staying flexible. A money market fund suits emergency savings, short-term goals and money you may need soon.","Fanya pesa taslimu zako zizae huku ukibaki na unyumbufu. Mfuko wa soko la fedha unafaa akiba ya dharura, malengo ya muda mfupi na pesa unazoweza kuhitaji hivi karibuni.")),
 ("investments","balanced-fund","pie",("Balanced Fund","Mfuko Uliosawazishwa"),("A mix of shares, bonds and cash in one fund. Aim for growth with a steadier ride for goals three to seven years away.","Mchanganyiko wa hisa, dhamana na fedha taslimu katika mfuko mmoja. Lenga ukuaji kwa safari tulivu zaidi kwa malengo ya miaka mitatu hadi saba.")),
 ("investments","equity-fund","bars",("Equity Fund","Mfuko wa Hisa"),("Invest in listed companies for long-term growth. Best for patient investors who can ride out market ups and downs.","Wekeza katika kampuni zilizoorodheshwa kwa ukuaji wa muda mrefu. Bora kwa wawekezaji wavumilivu wanaoweza kustahimili mabadiliko ya soko.")),
 ("investments","fixed-income-fund","admin",("Fixed Income Fund","Mfuko wa Mapato Yasiyobadilika"),("Focus on Treasury bills, bonds and other interest-bearing assets for a more predictable income stream.","Zingatia hati za Hazina, dhamana na mali nyingine zinazozaa riba kwa mtiririko wa kipato unaotabirika zaidi.")),
 ("investments","dollar-money-market-fund","dollar",("Dollar Money Market Fund","Mfuko wa Soko la Fedha wa Dola"),("Hold part of your savings in US dollars. Useful for diaspora families, imports, school fees abroad and currency diversification.","Weka sehemu ya akiba yako kwa dola za Marekani. Unafaa familia za ughaibuni, uagizaji, karo za nje na kuongeza aina za sarafu.")),
 ("investments","unit-trust-faqs","help",("Unit Trust Scheme FAQs","Maswali kuhusu Mpango wa Unit Trust"),("Straight answers on how unit trusts work: units and prices, fees, withdrawals, risks and how to get started.","Majibu ya moja kwa moja kuhusu jinsi unit trust zinavyofanya kazi: vitengo na bei, ada, kutoa fedha, hatari na jinsi ya kuanza.")),
 ("investments","information-memorandum","doc",("Information Memorandum","Waraka wa Taarifa"),("Request the full information memorandum before you invest. It sets out objectives, strategy, risks, fees and your rights as an investor.","Omba waraka kamili wa taarifa kabla ya kuwekeza. Unaeleza malengo, mkakati, hatari, ada na haki zako kama mwekezaji.")),
 ("trustee","retirement-benefits-schemes","umbrella",("Retirement Benefits Schemes","Mipango ya Mafao ya Kustaafu"),("Set up and run a retirement benefits scheme for your organisation, from trust deed and rules to trustees, investments and member communication.","Anzisha na uendeshe mpango wa mafao ya kustaafu kwa taasisi yako, kuanzia hati ya udhamini na kanuni hadi wadhamini, uwekezaji na mawasiliano kwa wanachama.")),
 ("trustee","collective-investment-schemes","pie",("Collective Investment Schemes","Mipango ya Uwekezaji wa Pamoja"),("Independent trustee oversight for pooled investment funds, safeguarding investor assets and checking that managers keep to the rules.","Usimamizi huru wa mdhamini kwa mifuko ya uwekezaji wa pamoja, kulinda mali za wawekezaji na kuhakikisha mameneja wanafuata kanuni.")),
 ("trustee","family-trusts","heart",("Family Trusts","Trust za Familia"),("Protect family wealth and pass it on as you intend. A family trust provides structure, continuity and fairness across generations.","Linda utajiri wa familia na uuache kama ulivyokusudia. Trust ya familia hutoa muundo, mwendelezo na haki kwa vizazi vingi.")),
 ("trustee","esop-management","people",("ESOP Management","Usimamizi wa ESOP"),("Design and run an employee share ownership plan that rewards and retains your people, with clear rules, valuation and administration.","Buni na uendeshe mpango wa umiliki wa hisa kwa wafanyakazi unaowazawadia na kuwabakiza, wenye kanuni, tathmini na usimamizi ulio wazi.")),
 ("trustee","employee-benefits-trust","shield",("Employee Benefits Trust","Trust ya Marupurupu ya Wafanyakazi"),("Hold and manage staff benefits, such as incentive and welfare funds, in a trust that is secure, transparent and tax-aware.","Shikilia na usimamie marupurupu ya wafanyakazi, kama mifuko ya motisha na ustawi, katika trust iliyo salama, wazi na inayozingatia kodi.")),
 ("trustee","consulting-advisory","compass",("Consulting & Advisory","Ushauri na Ushauri Elekezi"),("Independent advice on scheme design, governance reviews, fund selection and succession, tailored to your organisation.","Ushauri huru kuhusu muundo wa mipango, mapitio ya utawala, uchaguzi wa mifuko na urithi, unaolingana na taasisi yako.")),
]
SVD = [dict(cat=a, slug=b, icon=c, name=d, desc=e) for a, b, c, d, e in SV]
PHOTOS = {
    "personal-pension": "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80",
    "pension-administration": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80",
    "umbrella-fund": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    "diaspora-fund": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    "income-drawdown": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
    "principal-officer": "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80",
    "corporate-trustee": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    "training-services": "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80",
    "personal-insurance": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    "corporate-insurance": "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
    "motor-insurance": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    "domestic-package": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "money-market-fund": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80",
    "balanced-fund": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
    "equity-fund": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
    "fixed-income-fund": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80",
    "dollar-money-market-fund": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80",
    "unit-trust-faqs": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
    "information-memorandum": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    "retirement-benefits-schemes": "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80",
    "collective-investment-schemes": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    "family-trusts": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    "employee-benefits-trust": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    "consulting-advisory": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    "esop-management": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
}

def art(root, s, size=""):
    c = CATS[s["cat"]]
    local = os.path.exists(os.path.join(ROOT, "assets/img/services", s["slug"] + ".jpg"))
    img = ""
    if local: img = f'<img src="{root}assets/img/services/{s["slug"]}.jpg" alt="" loading="lazy">'
    elif s["slug"] in PHOTOS: img = f'<img src="{PHOTOS[s["slug"]]}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">'
    return f'<div class="art {size}" style="--c1:{c["c1"]};--c2:{c["c2"]}"><i class="plate"></i><i class="plate b"></i><span class="orb">{ico(s["icon"])}</span>{img}</div>'
def cart(cat, size=""):
    c = CATS[cat]
    return f'<div class="art {size}" style="--c1:{c["c1"]};--c2:{c["c2"]}"><i class="plate"></i><i class="plate b"></i><span class="orb">{ico(c["icon"])}</span></div>'
def svc_url(root, s): return f'{root}services/{s["slug"]}.html'
def by_cat(cat): return [s for s in SVD if s["cat"] == cat]

# ------------------------------------------------------------------ SHARED PARTS
NAV = [("index.html", "Home", "Nyumbani"), ("about.html", "About", "Kuhusu Sisi"), ("services/index.html", "Services", "Huduma"),
       ("insights.html", "Insights", "Makala"), ("resources.html", "Resources", "Rasilimali"), ("contact.html", "Contact", "Wasiliana Nasi")]

def svc_cols(root, cls="dd-col", head="h5"):
    out = ""
    for k, c in CATS.items():
        out += f'<div class="{cls}"><{head}>{T(*c["name"])}</{head}>' + ("<ul>" if cls == "fcol" else "") + "".join(
            (f'<li><a href="{svc_url(root, s)}">{T(*s["name"])}</a></li>' if cls == "fcol" else f'<a href="{svc_url(root, s)}">{T(*s["name"])}</a>') for s in by_cat(k)) + ("</ul>" if cls == "fcol" else "") + "</div>"
    return out

def header(root, rel):
    items = []
    for href, en, sw in NAV:
        cur = ' aria-current="page"' if (rel == href or (en == "Services" and rel.startswith("services/"))) else ""
        if en == "Services":
            items.append(f'<div class="dd-wrap"><a href="{root}{href}"{cur}>{T(en, sw)}</a><button class="chev" aria-label="Services menu" aria-expanded="false">&#9662;</button>'
                         f'<div class="dd"><div class="dd-in">{svc_cols(root)}<a class="dd-all" href="{root}services/index.html">{T("View all services", "Tazama huduma zote")} &rarr;</a></div></div></div>')
        else: items.append(f'<a href="{root}{href}"{cur}>{T(en, sw)}</a>')
    return (f'<header class="hd"><div class="wrap">{BRAND.format(r=root)}<nav class="nav" id="nav" aria-label="Main">{"".join(items)}</nav>'
            f'<div class="hr"><div class="lang" role="group" aria-label="Language"><button data-l="en" aria-pressed="true">EN</button><button data-l="sw" aria-pressed="false">SW</button></div>'
            f'{btn(root + "contact.html#book", ("Book Consultation", "Weka Miadi"), "sm")}<button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="nav"><i></i><i></i><i></i></button></div></div></header>')

def contact_lines():
    l = [ADDRESS, f'<a href="mailto:{EMAIL}">{EMAIL}</a>']
    if PHONE: l.insert(1, f'<a href="tel:{tel}">{PHONE}</a>')
    if WHATSAPP: l.append(f'<a href="https://wa.me/{WHATSAPP}">WhatsApp</a>')
    l.append(T(*HOURS)); return l

def footer(root):
    co = "".join(f'<li><a href="{root}{h}">{T(e, w)}</a></li>' for h, e, w in [("about.html", "About", "Kuhusu Sisi"), ("insights.html", "Insights", "Makala"), ("resources.html", "Resources", "Rasilimali"), ("careers.html", "Careers", "Nafasi za Kazi"), ("contact.html", "Contact", "Wasiliana Nasi")])
    lg = [("privacy-policy", "Privacy Policy", "Sera ya Faragha"), ("terms-of-use", "Terms of Use", "Masharti ya Matumizi"), ("cookie-policy", "Cookie Policy", "Sera ya Vidakuzi"),
          ("risk-disclosure", "Risk Disclosure", "Tahadhari ya Hatari"), ("complaints-procedure", "Complaints", "Malalamiko"), ("disclaimer", "Disclaimer", "Kanusho")]
    ll = "".join(f'<a href="{root}legal/{s}.html">{T(e, w)}</a>' for s, e, w in lg)
    cl = "".join(f"<li>{x}</li>" for x in contact_lines())
    wa = f'<a class="wa" href="https://wa.me/{WHATSAPP}?text=Hello%20Fanaka%2C%20I%27d%20like%20to%20book%20a%20consultation" aria-label="WhatsApp">&#9742; WhatsApp</a>' if WHATSAPP else ""
    return f'''<footer class="ft">
<div class="nl"><div class="wrap"><div><h3>{T("Smart money insights, monthly", "Mawazo mahiri ya pesa, kila mwezi")}</h3><p style="color:#d3dff2">{T("Practical guidance. No spam. Unsubscribe anytime.", "Mwongozo wa vitendo. Hakuna barua taka. Jiondoe wakati wowote.")}</p></div>
<form data-form data-mail="{EMAIL}" data-subject="Newsletter signup" novalidate><div class="hp"><input class="hp" tabindex="-1" autocomplete="off" name="website" aria-hidden="true"></div>
<div><input type="email" name="email" required aria-label="Email" {PH("Your email address", "Barua pepe yako")}><span class="err">{T("Enter a valid email.", "Weka barua pepe sahihi.")}</span></div>
<button class="btn" type="submit">{T("Subscribe", "Jiunge")}</button></form></div></div>
<div class="wrap fg"><div>{BRAND.format(r=root)}<p style="margin-top:16px;max-width:36ch">{T("Prosperity, advised with integrity. Pensions, insurance, investments and trusteeship from Nairobi.", "Ustawi unaoshauriwa kwa uadilifu. Pensheni, bima, uwekezaji na udhamini kutoka Nairobi.")}</p>
<div class="soc"><a href="#" aria-label="LinkedIn">in</a><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="X">X</a><a href="#" aria-label="Instagram">ig</a></div>
<div class="lang" role="group" aria-label="Language" style="width:max-content"><button data-l="en" aria-pressed="true">EN</button><button data-l="sw" aria-pressed="false">SW</button></div></div>
<div><h4>{T("Company", "Kampuni")}</h4><ul>{co}</ul></div><div><h4>{T("Get in touch", "Wasiliana Nasi")}</h4><ul>{cl}</ul></div></div>
<div class="wrap fsv">{svc_cols(root, "fcol", "h4")}</div>
<div class="wrap fb"><div>&copy; 2026 Fanaka Noblewealth Advisory. {T("All rights reserved.", "Haki zote zimehifadhiwa.")}</div><div class="legalrow">{ll}<button data-ck="open">{T("Cookie Settings", "Mipangilio ya Vidakuzi")}</button></div>
<p class="disc">{T("Investments can go down as well as up and returns are not guaranteed. Information on this site is general and is not personal financial advice. Regulated activities are carried out only with the required licences or through licensed partners.", "Uwekezaji unaweza kupanda au kushuka na faida haihakikishwi. Taarifa katika tovuti hii ni za jumla na si ushauri wa kifedha wa kibinafsi. Shughuli zinazodhibitiwa hufanywa tu kwa leseni zinazohitajika au kupitia washirika wenye leseni.")}</p></div></footer>
<div class="ck" role="dialog" aria-label="Cookies"><p>{T("We use essential cookies to make this site work, and optional analytics and marketing cookies only with your consent.", "Tunatumia vidakuzi muhimu ili tovuti ifanye kazi, na vidakuzi vya uchambuzi na masoko kwa ridhaa yako tu.")} <a href="{root}legal/cookie-policy.html">{T("Cookie Policy", "Sera ya Vidakuzi")}</a></p>
<div class="row"><button class="btn sm" data-ck="all">{T("Accept all", "Kubali vyote")}</button><button class="btn sm o" data-ck="none">{T("Reject non-essential", "Kataa visivyo muhimu")}</button><button class="btn sm o" data-ck="manage">{T("Manage preferences", "Dhibiti mapendeleo")}</button></div></div>
<div class="cm" role="dialog" aria-modal="true" aria-label="Cookie preferences"><div><h3>{T("Cookie preferences", "Mapendeleo ya vidakuzi")}</h3>
<div class="opt"><div><b>{T("Strictly necessary", "Muhimu sana")}</b><small>{T("Security, language choice and consent. Always on.", "Usalama, lugha na ridhaa. Daima vimewashwa.")}</small></div><input type="checkbox" checked disabled></div>
<div class="opt"><div><b>{T("Analytics", "Uchambuzi")}</b><small>{T("Helps us understand how the site is used.", "Hutusaidia kuelewa jinsi tovuti inavyotumika.")}</small></div><input type="checkbox" id="ck-a"></div>
<div class="opt"><div><b>{T("Marketing", "Masoko")}</b><small>{T("Used to measure and personalise campaigns.", "Hutumika kupima na kubinafsisha kampeni.")}</small></div><input type="checkbox" id="ck-m"></div>
<div class="row" style="margin-top:20px"><button class="btn sm" data-ck="save">{T("Save choices", "Hifadhi chaguo")}</button><button class="btn sm o" data-ck="none">{T("Reject non-essential", "Kataa visivyo muhimu")}</button></div></div></div>{wa}<button class="top" aria-label="Back to top">&uarr;</button>'''

def page(rel, title, desc, body, bar=False, extra_head=""):
    root = "../" * rel.count("/")
    bar_html = ""
    if bar:
        first = f'<a href="tel:{tel}">{T("Call", "Piga Simu")}</a>' if PHONE else f'<a href="mailto:{EMAIL}">{T("Email", "Barua pepe")}</a>'
        bar_html = f'<div class="mbar">{first}<a href="{root}contact.html#book">{T("Book", "Weka Miadi")}</a></div>'
    doc = f'''<!DOCTYPE html>
<html lang="en" class="nojs"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)} | Fanaka Noblewealth Advisory</title><meta name="description" content="{esc(desc)}"><meta name="theme-color" content="#0A1E42">
<meta property="og:title" content="{esc(title)} | Fanaka Noblewealth Advisory"><meta property="og:description" content="{esc(desc)}"><meta property="og:type" content="website">
<link rel="icon" href="{root}assets/img/favicon.png" type="image/png"><link rel="apple-touch-icon" href="{root}assets/img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{root}assets/css/style.css">{extra_head}<script>document.documentElement.classList.remove("nojs")</script></head>
<body data-root="{root}" class="{'has-bar' if bar else ''}"><a class="skip" href="#main">{T("Skip to content", "Ruka hadi maudhui")}</a><div class="pt" aria-hidden="true"></div>
{header(root, rel)}<main id="main">{body}</main>{footer(root)}{bar_html}<script src="{root}assets/js/main.js"></script><script src="{root}assets/js/extra.js"></script></body></html>'''
    path = os.path.join(ROOT, rel); os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, "w", encoding="utf-8").write(doc)

def ihero(root, crumbs, h, p=None, art_html="", tag=""):
    cr = f'<a href="{root}index.html">{T("Home", "Nyumbani")}</a>' + "".join(f"<span>/</span>{c}" for c in crumbs)
    pp = f"<p>{T(*p)}</p>" if p else ""
    tg = f'<span class="tag">{tag}</span><br>' if tag else ""
    return f'<section class="ihero"><div class="wrap {"two" if art_html else ""}"><div><div class="crumb">{cr}</div>{tg}<h1 style="font-size:clamp(34px,5.2vw,68px);max-width:20ch">{T(*h)}</h1>{pp}</div>{art_html}</div></section>'

def cta(root, h=("Ready to build your prosperity?", "Uko tayari kujenga ustawi wako?"), p=("Book a free, no-pressure consultation and leave with a clear next step.", "Weka miadi ya ushauri wa bure, bila shinikizo, uondoke na hatua inayofuata iliyo wazi.")):
    wa = f'<a class="btn o lg" href="https://wa.me/{WHATSAPP}">{T("Chat on WhatsApp", "Zungumza Nasi WhatsApp")}</a>' if WHATSAPP else f'<a class="btn o lg" href="mailto:{EMAIL}">{T("Email Us", "Tutumie Barua Pepe")}</a>'
    return f'<section class="cta"><div class="wrap"><h2 class="gold" style="display:block">{T(*h)}</h2><p>{T(*p)}</p><div class="row">{btn(root + "contact.html#book", BOOK, "lg")}{wa}</div></div></section>'

PROCESS = [("Discover", "Gundua", "We listen first: your goals, income, family and concerns.", "Tunasikiliza kwanza: malengo, kipato, familia na wasiwasi wako."),
           ("Plan", "Panga", "We design a clear, written plan tailored to you.", "Tunabuni mpango ulioandikwa na wazi unaokufaa."),
           ("Implement", "Tekeleza", "We help you put the plan into action, step by step.", "Tunakusaidia kutekeleza mpango hatua kwa hatua."),
           ("Review", "Kagua", "We revisit your plan regularly and adjust as life changes.", "Tunapitia mpango wako mara kwa mara na kuurekebisha maisha yanapobadilika.")]
def process(): return '<div class="g g4 steps">' + "".join(f'<div class="step rv">{T(e, s, "h3")}<p>{T(pe, ps)}</p></div>' for e, s, pe, ps in PROCESS) + "</div>"

# ------------------------------------------------------------------ HOME
def home():
    cats = ""
    for k, c in CATS.items():
        li = "".join(f'<li><a href="services/{s["slug"]}.html">{T(*s["name"])}</a></li>' for s in by_cat(k)[:5])
        cats += f'<div class="card cat tilt rv">{cart(k)}<div class="in">{T(*c["name"], tag="h3")}<p>{T(*c["blurb"])}</p><ul>{li}</ul><a class="more" href="services/index.html#{k}">{T("See all " + c["name"][0].lower() + " services", "Tazama huduma zote")}</a></div></div>'
    goals = [("Retire comfortably", "Staafu kwa starehe", "pension", "personal-pension", "Start a Personal Pension Plan", "Anza Mpango wa Pensheni Binafsi", "A retirement plan in your own name, built to give you a steady income for life.", "Mpango wa kustaafu kwa jina lako, ulioundwa kukupa kipato thabiti maisha yote."),
             ("Grow my savings", "Kuza akiba yangu", "trend", "money-market-fund", "Explore the Money Market Fund", "Gundua Mfuko wa Soko la Fedha", "Put your cash to work while keeping it flexible. A smart first step for any saver.", "Fanya pesa zako zizae huku ukibaki na unyumbufu. Hatua ya kwanza bora kwa kila mwekaji akiba."),
             ("Protect my family", "Linda familia yangu", "shield", "personal-insurance", "Get a Personal Insurance Quote", "Pata Nukuu ya Bima ya Kibinafsi", "Life, medical and education cover chosen around your family and your budget.", "Bima ya maisha, afya na elimu iliyochaguliwa kulingana na familia na bajeti yako."),
             ("Run my business better", "Endesha biashara yangu vizuri", "building", "consulting-advisory", "Talk to a Business Specialist", "Zungumza na Mtaalamu wa Biashara", "Staff schemes, trusts and governance advice for owners and boards.", "Mipango ya wafanyakazi, trust na ushauri wa utawala kwa wamiliki na bodi.")]
    qb = "".join(f'<button data-quiz="{i}" aria-pressed="{"true" if i == 0 else "false"}">{ico(g[2])}{T(g[0], g[1])}</button>' for i, g in enumerate(goals))
    qp = "".join(f'<div class="qp {"on" if i == 0 else ""}">{T(g[4], g[5], "h3")}<p>{T(g[6], g[7])}</p><div class="row">{btn(f"services/{g[3]}.html", ("Learn more", "Jifunze zaidi"))}{btn(f"contact.html?service={g[3]}#book", ("Talk to an advisor", "Zungumza na mshauri"), "o")}</div></div>' for i, g in enumerate(goals))
    cube = "".join(f'<a href="services/index.html#{k}">{T(*c["name"])}<small>FANAKA</small></a>' for k, c in list(CATS.items())) + '<a href="about.html">F<small>NOBLEWEALTH</small></a><a href="contact.html#book">&rarr;<small>BOOK</small></a>'
    pill = [("Independent", "Huru", "Advice built around you, not a sales target.", "Ushauri unaokulenga wewe, si lengo la mauzo."), ("Transparent", "Wazi", "Plain language and fees explained upfront.", "Lugha rahisi na ada zinaelezwa mwanzoni."),
            ("Personal", "Wa Kibinafsi", "A dedicated advisor who knows your story.", "Mshauri mahususi anayekufahamu na hadithi yako."), ("Long-term", "Wa Muda Mrefu", "Plans designed to last across generations.", "Mipango iliyoundwa kudumu vizazi vingi.")]
    pl = "".join(f'<li><b>{T(a, b)}</b>: {T(c, d)}</li>' for a, b, c, d in pill)
    body = f'''<section class="hero">
<div class="wrap"><div class="hero-copy"><h1>{T("Wealth built with purpose. <span class='gold'>Legacy built to last.</span>", "Utajiri wenye maana. <span class='gold'>Urithi unaodumu.</span>")}</h1>
<p>{T("Pensions, insurance, investments and trusteeship, all under one trusted roof in Nairobi. Start with a free consultation.", "Pensheni, bima, uwekezaji na udhamini, vyote chini ya paa moja linaloaminika Nairobi. Anza na ushauri wa bure.")}</p>
<div class="row hero-actions">{btn("contact.html#book", BOOK, "lg")}{btn("services/index.html", ("Explore Our Services", "Gundua Huduma Zetu"), "o lg")}</div></div>
<div class="cubew" aria-label="Explore our services"><div class="cube">{cube}</div></div></div><div class="scroll"></div></section>
<section class="trust"><div class="wrap g">{"".join(f"<div><b>{T(a, b)}</b><small>{T(c, d)}</small></div>" for a, b, c, d in [("25 services", "Huduma 25", "Four specialist areas", "Maeneo manne ya kitaalamu"), ("Independent", "Huru", "Advice in your interest", "Ushauri kwa manufaa yako"), ("Transparent", "Wazi", "Clear fees, plain words", "Ada wazi, maneno rahisi"), ("Bilingual", "Lugha Mbili", "English and Kiswahili", "Kiswahili na Kiingereza")])}</div></section>
<section class="sec dark"><div class="wrap quiz"><div><h2>{T("What matters most to you?", "Nini muhimu zaidi kwako?")}</h2><div class="rule"></div><p class="lead" style="margin-bottom:26px">{T("Pick a goal and we will point you to the right solution in seconds.", "Chagua lengo nasi tutakuelekeza kwenye suluhisho sahihi kwa sekunde.")}</p><div class="qb">{qb}</div></div><div>{qp}</div></div></section>
<section class="sec"><div class="wrap"><div class="head c"><h2>{T("Everything you need, in four specialist areas", "Kila unachohitaji, katika maeneo manne ya kitaalamu")}</h2><div class="rule"></div><p class="lead">{T("From your first pension contribution to a multi-generation family trust.", "Kuanzia mchango wako wa kwanza wa pensheni hadi trust ya familia ya vizazi vingi.")}</p></div><div class="g g4">{cats}</div></div></section>
<section class="sec alt"><div class="wrap split"><div><h2>{T("Why Fanaka", "Kwa nini Fanaka")}</h2><div class="rule"></div><p class="lead">{T("<em>Fanaka</em> means prosperity in Kiswahili. We believe real prosperity is peace of mind, built patiently and honestly.", "<em>Fanaka</em> maana yake ni ustawi kwa Kiswahili. Tunaamini ustawi halisi ni amani ya moyo, inayojengwa kwa subira na uaminifu.")}</p><ul class="ticks" style="margin-top:20px">{pl}</ul></div><div class="coinw"><div class="coin">F</div></div></div></section>
<section class="sec dark"><div class="wrap"><div class="head c"><h2>{T("How we work", "Jinsi tunavyofanya kazi")}</h2><div class="rule"></div></div>{process()}</div></section>
<section class="sec"><div class="wrap split"><div><h2>{T("See what your savings could become", "Ona akiba yako inaweza kuwa nini")}</h2><div class="rule"></div><p class="lead">{T("Try our free growth calculator, then talk to an advisor about turning the numbers into a plan.", "Jaribu kikokotoo chetu cha ukuaji bila malipo, kisha zungumza na mshauri kugeuza namba kuwa mpango.")}</p><div class="row" style="margin-top:24px">{btn("resources.html#calc", ("Open the calculator", "Fungua kikokotoo"))}</div></div>
<div class="card"><p>{T("Save KES 10,000 a month for 20 years at 10% a year and you could reach about", "Ukiweka KES 10,000 kila mwezi kwa miaka 20 kwa 10% kwa mwaka, unaweza kufikia takriban")}</p><div class="big gold">KES 7.6M</div><p style="font-size:13px">{T("Illustration only. Returns are not guaranteed.", "Mfano tu. Faida haihakikishwi.")}</p></div></div></section>{cta("")}'''
    ld = '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FinancialService","name":"Fanaka Noblewealth Advisory","areaServed":"Kenya","address":{"@type":"PostalAddress","addressLocality":"Nairobi","addressCountry":"KE"}}</script>'
    page("index.html", "Pensions, Insurance & Investments in Nairobi", "Fanaka Noblewealth Advisory: pension, insurance, investment and corporate trustee solutions in Nairobi, Kenya.", body, extra_head=ld)

# ------------------------------------------------------------------ SERVICES
def services():
    r = "../"; groups = ""
    for k, c in CATS.items():
        cards = "".join(f'<a class="card tilt rv" href="{s["slug"]}.html">{art(r + "", s)}{T(*s["name"], tag="h3")}<span class="more">{T("Learn more", "Jifunze zaidi")}</span></a>' for s in by_cat(k))
        groups += f'<section class="sec {"alt" if list(CATS).index(k) % 2 else ""}" id="{k}"><div class="wrap"><div class="head"><h2>{T(*c["name"])}</h2><div class="rule"></div><p class="lead">{T(*c["blurb"])}</p></div><div class="g g4">{cards}</div></div></section>'
    page("services/index.html", "Our Services", "Pension, insurance, investment and corporate trustee services from Fanaka Noblewealth Advisory in Nairobi.",
         ihero(r, [T("Services", "Huduma")], ("Our services", "Huduma zetu"), ("Twenty-five solutions across four specialist areas, each with a clear next step.", "Suluhisho ishirini na tano katika maeneo manne ya kitaalamu, kila moja na hatua inayofuata iliyo wazi.")) + groups + cta(r))
    for s in SVD:
        c = CATS[s["cat"]]
        ben = "".join(f'<div class="card tilt rv"><div class="ic">{ico(c["icon"])}</div><p style="margin-top:14px;color:var(--ink);font-weight:500">{T(*b)}</p></div>' for b in c["ben"])
        faq = "".join(f'<details><summary>{T(q, qs)}</summary><p>{T(a, a2)}</p></details>' for q, qs, a, a2 in c["faq"])
        sib = [o for o in by_cat(s["cat"]) if o is not s][:4]
        rel = "".join(f'<a class="card tilt rv" href="{o["slug"]}.html">{art("../", o)}{T(*o["name"], tag="h3")}<span class="more">{T("Learn more", "Jifunze zaidi")}</span></a>' for o in sib)
        body = (ihero(r, [f'<a href="index.html#{s["cat"]}">{T(*c["name"])}</a>', T(*s["name"])], s["name"], s["desc"], art(r, s, "xl"), T(*c["name"])) +
          f'<section class="sec"><div class="wrap split"><div><h2>{T("Who it is for", "Inamfaa nani")}</h2><div class="rule"></div><p class="lead">{T(*c["who"])}</p><div class="row" style="margin-top:28px">{btn(f"{r}contact.html?service={s["slug"]}#book", c["cta"], "lg")}{btn(f"{r}contact.html?service={s["slug"]}#book", ("Book a Free Consultation", "Weka Miadi Bila Malipo"), "o")}</div></div>'
          f'<div class="card"><h3>{T("What you can expect", "Utarajie nini")}</h3><ul class="ticks" style="margin-top:12px">{"".join(f"<li>{T(*b)}</li>" for b in c["ben"][:3])}</ul></div></div></section>'
          f'<section class="sec alt"><div class="wrap"><div class="head"><h2>{T("Why clients choose this", "Kwa nini wateja huchagua hili")}</h2><div class="rule"></div></div><div class="g g4">{ben}</div></div></section>'
          f'<section class="sec dark"><div class="wrap"><div class="head"><h2>{T("How it works", "Jinsi inavyofanya kazi")}</h2><div class="rule"></div></div>{process()}</div></section>'
          f'<section class="sec"><div class="wrap" style="max-width:860px"><div class="head"><h2>{T("Frequently asked questions", "Maswali yanayoulizwa mara nyingi")}</h2><div class="rule"></div></div>{faq}<p style="font-size:13.5px;margin-top:18px">{T("Investments can go down as well as up and this page is general information, not personal advice. See our", "Uwekezaji unaweza kupanda au kushuka na ukurasa huu ni taarifa za jumla, si ushauri binafsi. Tazama")} <a href="{r}legal/risk-disclosure.html" style="text-decoration:underline">{T("Risk Disclosure", "Tahadhari ya Hatari")}</a>.</p></div></section>'
          f'<section class="sec alt"><div class="wrap"><div class="head"><h2>{T("Related services", "Huduma zinazohusiana")}</h2><div class="rule"></div></div><div class="g g4">{rel}</div></div></section>' + cta(r))
        page(f"services/{s['slug']}.html", s["name"][0], s["desc"][0], body, bar=True)

# ------------------------------------------------------------------ OTHER PAGES
def others():
    r = ""
    vals = [("Integrity", "Uadilifu", "We act in your interest, always.", "Tunatenda kwa manufaa yako, daima."), ("Clarity", "Uwazi", "No jargon. No surprises.", "Hakuna lugha ngumu. Hakuna mshangao."),
            ("Care", "Kujali", "Your family’s security is personal to us.", "Usalama wa familia yako ni jambo letu binafsi."), ("Discipline", "Nidhamu", "Patient, evidence-based decisions.", "Maamuzi ya subira yanayotegemea ushahidi.")]
    vc = "".join(f'<div class="card tilt rv">{T(a, b, "h3")}<p>{T(c, d)}</p></div>' for a, b, c, d in vals)
    page("about.html", "About Us", "Meet Fanaka Noblewealth Advisory, an independent wealth advisory firm in Nairobi.",
      ihero(r, [T("About", "Kuhusu Sisi")], ("Prosperity, advised with integrity", "Ustawi unaoshauriwa kwa uadilifu"), ("Fanaka is a Kenyan wealth advisory built to be personal, transparent and focused on the long term.", "Fanaka ni kampuni ya ushauri wa utajiri ya Kenya iliyojengwa kuwa ya kibinafsi, wazi na inayolenga muda mrefu.")) +
      f'<section class="sec alt"><div class="wrap about-video-wrap"><div class="about-video-frame"><iframe src="assets/video/video.html" title="Fanaka word art" aria-label="Fanaka word art" loading="lazy"></iframe></div><div><h2>{T("The story behind the name", "Hadithi ya jina")}</h2><div class="rule"></div><p class="lead">{T("<em>Fanaka</em> means prosperity, comfort and success. It reflects our belief that good financial advice should help people sleep better, plan better and leave a stronger legacy.", "<em>Fanaka</em> maana yake ni ustawi, faraja na mafanikio. Inawakilisha imani yetu kwamba ushauri mzuri wa kifedha unapaswa kuwasaidia watu kulala vizuri, kupanga vizuri na kuacha urithi wenye nguvu.")}</p></div></div></section>'
      f'<section class="sec"><div class="wrap split"><div><h2>{T("Our story", "Hadithi yetu")}</h2><div class="rule"></div><p class="lead">{T("<em>Fanaka</em> is Kiswahili for prosperity, comfort and success. Too many Kenyans earn well yet lack a clear plan for retirement, protection and growth. We bring pensions, insurance, investments and trusteeship together so that good advice is honest, understandable and within reach.", "<em>Fanaka</em> ni Kiswahili cha ustawi, faraja na mafanikio. Wakenya wengi wanapata vizuri lakini hawana mpango wazi wa kustaafu, ulinzi na ukuaji. Tunaunganisha pensheni, bima, uwekezaji na udhamini ili ushauri mzuri uwe wa kweli, rahisi kueleweka na unaopatikana.")}</p></div><div class="coinw"><div class="coin">F</div></div></div></section>'
      f'<section class="sec dark"><div class="wrap"><div class="g g2"><div class="card"><h3>{T("Our mission", "Dhamira yetu")}</h3><p>{T("To help people and businesses build lasting wealth through clear, independent and caring advice.", "Kusaidia watu na biashara kujenga utajiri endelevu kupitia ushauri wazi, huru na wenye kujali.")}</p></div><div class="card"><h3>{T("Our vision", "Dira yetu")}</h3><p>{T("A Kenya where every family can plan, grow and pass on its wealth with confidence.", "Kenya ambapo kila familia inaweza kupanga, kukuza na kuacha utajiri kwa kujiamini.")}</p></div></div></div></section>'
      f'<section class="sec"><div class="wrap"><div class="head c"><h2>{T("Our values", "Maadili yetu")}</h2><div class="rule"></div></div><div class="g g4">{vc}</div></div></section>'
      f'<section class="sec alt"><div class="wrap head"><h2>{T("How we stay accountable", "Jinsi tunavyowajibika")}</h2><div class="rule"></div><p class="lead">{T("Regulated activities are carried out only with the required licences or through licensed partners. We disclose our fees upfront, keep your data private, and publish a clear complaints procedure.", "Shughuli zinazodhibitiwa hufanywa tu kwa leseni zinazohitajika au kupitia washirika wenye leseni. Tunaeleza ada mapema, tunalinda faragha ya data yako, na tuna utaratibu wazi wa malalamiko.")}</p></div></section>' + cta(r))

    g = [("How does a money market fund work?", "Mfuko wa soko la fedha hufanyaje kazi?", "It pools money from many investors and places it in short-term, interest-bearing assets such as Treasury bills and fixed deposits. It is popular for emergency savings because withdrawals are generally quick, though returns are not guaranteed.", "Hukusanya pesa kutoka kwa wawekezaji wengi na kuziweka katika mali za muda mfupi zinazozaa riba kama hati za Hazina na amana za muda maalum. Ni maarufu kwa akiba ya dharura kwa sababu kutoa fedha kwa kawaida ni haraka, ingawa faida haihakikishwi."),
         ("Why start retirement saving early?", "Kwa nini kuanza kuweka akiba ya kustaafu mapema?", "Returns earn returns of their own, so time is your biggest advantage. Saving a smaller amount for 30 years can beat a larger amount saved for 15.", "Faida huzaa faida zaidi, kwa hiyo muda ndio faida yako kubwa. Kuweka kiasi kidogo kwa miaka 30 kunaweza kushinda kiasi kikubwa kwa miaka 15."),
         ("What does comprehensive motor insurance cover?", "Bima kamili ya magari inafunika nini?", "It typically covers damage to your own car, theft, and liability to other people and their property. Terms and exclusions differ between insurers, so read the schedule carefully or ask us.", "Kwa kawaida hufunika uharibifu wa gari lako, wizi, na dhima kwa watu wengine na mali zao. Masharti na vighairi hutofautiana kati ya kampuni, kwa hiyo soma ratiba kwa makini au tuulize."),
         ("What is a family trust for?", "Trust ya familia ni ya nini?", "A family trust holds assets for named beneficiaries under rules you set. It can provide continuity, protect minors and reduce disputes after you are gone.", "Trust ya familia hushikilia mali kwa walengwa waliotajwa chini ya kanuni unazoweka. Inaweza kutoa mwendelezo, kulinda watoto na kupunguza migogoro baada yako.")]
    gd = "".join(f'<details><summary>{T(a, b)}</summary><p>{T(c, d)}</p></details>' for a, b, c, d in g)
    page("insights.html", "Insights", "Plain-language answers on money market funds, retirement, insurance and trusts in Kenya.",
      ihero(r, [T("Insights", "Makala")], ("Money, made clear", "Pesa, kwa uwazi"), ("Short, practical answers to the questions we hear most.", "Majibu mafupi ya vitendo kwa maswali tunayoulizwa mara nyingi.")) +
      f'<section class="sec"><div class="wrap" style="max-width:860px">{gd}<p style="margin-top:20px;font-size:13.5px">{T("General information only, not personal advice.", "Taarifa za jumla tu, si ushauri binafsi.")}</p></div></section>' + cta(r))

    page("resources.html", "Resources", "Free savings growth calculator and investor information from Fanaka Noblewealth Advisory.",
      ihero(r, [T("Resources", "Rasilimali")], ("Tools to plan smarter", "Zana za kupanga kwa busara")) +
      f'''<section class="sec" id="calc"><div class="wrap split"><div><h2>{T("Savings growth calculator", "Kikokotoo cha ukuaji wa akiba")}</h2><div class="rule"></div><p class="lead">{T("Estimate how regular saving can grow over time. This is an illustration, not a forecast or promise of returns.", "Kadiria jinsi akiba ya kawaida inavyoweza kukua. Hii ni mfano, si utabiri wala ahadi ya faida.")}</p></div>
<div class="calc"><form onsubmit="return false"><div><label for="c1">{T("Starting amount (KES)", "Kiasi cha kuanzia (KES)")}</label><input id="c1" type="number" value="100000" min="0"></div><div><label for="c2">{T("Monthly saving (KES)", "Akiba ya kila mwezi (KES)")}</label><input id="c2" type="number" value="10000" min="0"></div><div><label for="c3">{T("Assumed yearly return (%)", "Faida inayodhaniwa kwa mwaka (%)")}</label><input id="c3" type="number" value="10" min="0" step="0.5"></div><div><label for="c4">{T("Years", "Miaka")}</label><input id="c4" type="number" value="20" min="1"></div></form>
<p style="margin-top:20px">{T("Estimated value", "Thamani inayokadiriwa")}</p><div class="out gold" id="r1">-</div><p>{T("You contribute", "Unachangia")}: <b id="r2">-</b> &nbsp; {T("Growth", "Ukuaji")}: <b id="r3">-</b></p></div></div></section>
<section class="sec alt"><div class="wrap"><div class="g g2"><a class="card tilt" href="services/unit-trust-faqs.html">{T("Unit Trust Scheme FAQs", "Maswali kuhusu Unit Trust", "h3")}<p>{T("Straight answers before you invest.", "Majibu ya moja kwa moja kabla ya kuwekeza.")}</p><span class="more">{T("Read the FAQs", "Soma maswali")}</span></a><a class="card tilt" href="services/information-memorandum.html">{T("Information Memorandum", "Waraka wa Taarifa", "h3")}<p>{T("Request the full document for any fund.", "Omba waraka kamili wa mfuko wowote.")}</p><span class="more">{T("Request it", "Uombe")}</span></a></div></div></section>''' + cta(r))

    opts = "".join(f'<option value="{esc(s["name"][0])}" data-slug="{s["slug"]}">{s["name"][0]}</option>' for s in SVD)
    cl = "".join(f"<li>{x}</li>" for x in contact_lines())
    page("contact.html", "Contact Us", "Book a free consultation with Fanaka Noblewealth Advisory in Nairobi.",
      ihero(r, [T("Contact", "Wasiliana Nasi")], ("Let’s talk about your goals", "Tuzungumze kuhusu malengo yako"), ("Book a free, no-pressure consultation.", "Weka miadi ya ushauri wa bure, bila shinikizo.")) +
      f'''<section class="sec" id="book"><div class="wrap split" style="align-items:start"><div class="card"><form data-form data-mail="{EMAIL}" data-subject="Consultation request" action="{FORM_ENDPOINT}" novalidate><div class="hp"><input class="hp" tabindex="-1" autocomplete="off" name="website" aria-hidden="true"></div>
<div><label for="n">{T("Full name", "Jina kamili")}</label><input id="n" name="name" required autocomplete="name"><span class="err">{T("Please enter your name.", "Tafadhali weka jina lako.")}</span></div>
<div><label for="e">{T("Email", "Barua pepe")}</label><input id="e" name="email" type="email" required autocomplete="email"><span class="err">{T("Enter a valid email.", "Weka barua pepe sahihi.")}</span></div>
<div><label for="p">{T("Phone", "Simu")}</label><input id="p" name="phone" type="tel" autocomplete="tel"></div>
<div><label for="s">{T("Service of interest", "Huduma unayovutiwa nayo")}</label><select id="s" name="service">{opts}</select></div>
<div><label for="m">{T("How can we help?", "Tukusaidiaje?")}</label><textarea id="m" name="message" rows="4"></textarea></div>
<label class="chk"><input type="checkbox" required> <span>{T("I agree to Fanaka contacting me and to the", "Nakubali Fanaka kuwasiliana nami na")} <a href="legal/privacy-policy.html" style="text-decoration:underline">{T("Privacy Policy", "Sera ya Faragha")}</a>.</span></label><span class="err" style="display:block">{T("Consent is required.", "Ridhaa inahitajika.")}</span>
<button class="btn lg" type="submit">{T("Request my consultation", "Omba ushauri wangu")}<span class="ar">&rarr;</span></button></form></div>
<div><h2>{T("Visit or contact us", "Tutembelee au tuandikie")}</h2><div class="rule"></div><ul class="ticks">{cl}</ul>
<h3 style="margin-top:30px">{T("What happens next?", "Nini kinafuata?")}</h3><ol style="padding-left:20px;margin-top:10px"><li>{T("We reply within one business day.", "Tunajibu ndani ya siku moja ya kazi.")}</li><li>{T("We agree a time that suits you.", "Tunakubaliana wakati unaokufaa.")}</li><li>{T("We discuss your goals, free of charge.", "Tunazungumza malengo yako bila malipo.")}</li></ol></div></div></section>''')

    page("careers.html", "Careers", "Join Fanaka Noblewealth Advisory.",
      ihero(r, [T("Careers", "Nafasi za Kazi")], ("Build something lasting with us", "Jenga kitu cha kudumu pamoja nasi"), ("We are always glad to meet people who care about clients and craft.", "Tunafurahi kila wakati kukutana na watu wanaojali wateja na ufundi.")) +
      f'<section class="sec"><div class="wrap head"><h2>{T("Send us your CV", "Tutumie wasifu wako")}</h2><div class="rule"></div><p class="lead">{T("We recruit advisors, analysts and client-service professionals as we grow. Email your CV and a short note to", "Tunaajiri washauri, wachambuzi na wataalamu wa huduma kwa wateja tunapokua. Tuma wasifu wako na ujumbe mfupi kwa")} <a href="mailto:{EMAIL}" style="text-decoration:underline">{EMAIL}</a>.</p></div></section>')
    page("404.html", "Page not found", "Page not found.", f'<section class="sec" style="padding-top:180px;text-align:center"><div class="wrap"><h1 class="gold">404</h1><p class="lead" style="margin:16px auto">{T("We could not find that page.", "Hatukupata ukurasa huo.")}</p>{btn("index.html", ("Back to home", "Rudi nyumbani"))}</div></section>')
    page("thank-you.html", "Thank you", "Thank you.", f'<section class="sec" style="padding-top:180px;text-align:center"><div class="wrap"><h1 class="gold">{T("Thank you", "Asante")}</h1><p class="lead" style="margin:16px auto">{T("Your request is on its way. We will reply within one business day.", "Ombi lako linaendelea. Tutajibu ndani ya siku moja ya kazi.")}</p>{btn("index.html", ("Back to home", "Rudi nyumbani"))}</div></section>')

# ------------------------------------------------------------------ LEGAL (English; have a Kenyan lawyer review before launch)
LEGAL = {
 "privacy-policy": ("Privacy Policy", "Sera ya Faragha", [
  ("Who we are", f"Fanaka Noblewealth Advisory (“Fanaka”, “we”) is the data controller for personal data collected through this website. Contact us at {EMAIL}."),
  ("Data we collect", "Contact details you submit (name, email, phone), your enquiry, newsletter sign-ups, and technical data such as device type and pages viewed, the latter only with your cookie consent."),
  ("Why we use it", "To respond to enquiries, provide advice, send newsletters you asked for, improve the site, and meet legal obligations. Our lawful bases are consent, contract and legal obligation under the Kenya Data Protection Act, 2019."),
  ("Sharing", "We do not sell personal data. We share it only with service providers who help us run the site and communicate with you, under written agreements, or where the law requires."),
  ("Retention and security", "We keep data only as long as needed for the purposes above and use reasonable technical and organisational safeguards."),
  ("International transfers", "If data is processed outside Kenya, we ensure appropriate safeguards as required by the Data Protection Act, 2019."),
  ("Your rights", f"You may ask to access, correct, delete, restrict or object to the use of your data, withdraw consent, or request portability. Email {EMAIL}."),
  ("Children", "This site is not directed at children under 18."),
  ("Complaints", "You may complain to the Office of the Data Protection Commissioner (ODPC) in Kenya."),
  ("Changes", "We may update this policy and will show the date of the latest update on this page.")]),
 "terms-of-use": ("Terms of Use", "Masharti ya Matumizi", [
  ("Acceptance", "By using this website you agree to these terms. If you disagree, please do not use the site."),
  ("General information only", "Content is general information, not personal financial, legal or tax advice. Please seek advice for your circumstances."),
  ("Acceptable use", "Do not misuse the site, attempt unauthorised access, introduce malicious code or copy content for commercial use without permission."),
  ("Intellectual property", "The site’s text, design, logo and graphics belong to Fanaka or its licensors and may not be reproduced without written permission."),
  ("Third-party links", "We are not responsible for the content or practices of external websites."),
  ("Limitation of liability", "To the extent permitted by law, Fanaka is not liable for losses arising from use of or reliance on this website."),
  ("Governing law", "These terms are governed by the laws of the Republic of Kenya, and Kenyan courts have jurisdiction."),
  ("Changes", "We may update these terms from time to time.")]),
 "cookie-policy": ("Cookie Policy", "Sera ya Vidakuzi", [
  ("What are cookies?", "Cookies and similar technologies are small files stored on your device that help a website work and remember your choices."),
  ("Our categories", "Strictly necessary items are always on. Analytics and marketing cookies stay off until you give consent. Your choices are stored on your device."),
  ("Cookies and storage we use", "TABLE"),
  ("Managing your choices", "Use the “Cookie Settings” link in the footer at any time to change or withdraw consent. You can also block or delete cookies in your browser settings, though some features may stop working."),
  ("Contact", f"Questions? Email {EMAIL}.")]),
 "risk-disclosure": ("Risk Disclosure", "Tahadhari ya Hatari", [
  ("Investments carry risk", "The value of investments can fall as well as rise and you may get back less than you invest."),
  ("No guaranteed returns", "Past performance is not a reliable guide to future results. Any figures shown on this site are illustrations only."),
  ("Types of risk", "These include market risk, interest-rate risk, inflation risk, currency risk, liquidity risk, credit risk and concentration risk."),
  ("Your decisions", "Consider your objectives, time horizon and risk tolerance, and seek personal advice before investing. Read the information memorandum of any fund before you invest.")]),
 "complaints-procedure": ("Complaints Procedure", "Utaratibu wa Malalamiko", [
  ("How to complain", f"Email {EMAIL} or write to our Nairobi office, giving your name, contact details and a description of the issue."),
  ("Our response", "We acknowledge your complaint within 2 business days and aim to resolve it within 30 days, keeping you informed."),
  ("Escalation", "If you are unhappy with our response, you may escalate to the regulator responsible for the product concerned, or to the Office of the Data Protection Commissioner for data issues.")]),
 "disclaimer": ("Disclaimer", "Kanusho", [
  ("General information", "This website provides general information only and does not constitute personal financial, investment, legal or tax advice."),
  ("Regulated activities", "Regulated activities are carried out only with the required licences or through licensed partners and administrators. We do not claim any approval that has not been granted."),
  ("Accuracy", "We take care to keep information accurate and current but make no warranty that it is complete or error-free."),
  ("Illustrations", "Calculators and examples are illustrations, not forecasts or promises of returns.")]),
}
COOKIES = [("fanaka_lang", "Remembers your language (EN/SW)", "Persistent", "Necessary"), ("fanaka_consent", "Stores your cookie choices", "Persistent", "Necessary"),
           ("Analytics cookies", "Measure site usage, set only if you consent", "Up to 2 years", "Analytics"), ("Marketing cookies", "Measure campaigns, set only if you consent", "Varies", "Marketing")]
def legal():
    r = "../"
    for slug, (en, sw, secs) in LEGAL.items():
        toc = "".join(f'<a href="#s{i}">{h}</a>' for i, (h, _) in enumerate(secs)); sec = ""
        for i, (h, p) in enumerate(secs):
            if p == "TABLE": p = "<table><tr><th>Name</th><th>Purpose</th><th>Duration</th><th>Type</th></tr>" + "".join(f"<tr><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td></tr>" for a, b, c, d in COOKIES) + "</table>"; sec += f'<h2 id="s{i}">{h}</h2>{p}'
            else: sec += f'<h2 id="s{i}">{h}</h2><p>{p}</p>'
        extra = '<p style="margin-top:12px"><button class="btn sm" data-ck="open">Open cookie settings</button></p>' if slug == "cookie-policy" else ""
        body = (ihero(r, [T(en, sw)], (en, sw)) + f'<section class="sec"><div class="wrap legal"><p><em>{T("Last updated", "Imesasishwa")}: {UPDATED}. {T("The English text prevails.", "Maandishi ya Kiingereza ndiyo yanayozingatiwa.")}</em></p><div class="toc" style="margin:20px 0"><b>{T("Contents", "Yaliyomo")}</b>{toc}</div>{sec}{extra}</div></section>')
        page(f"legal/{slug}.html", en, f"{en} for Fanaka Noblewealth Advisory.", body)

def extras():
    os.makedirs(os.path.join(ROOT, "assets/img/services"), exist_ok=True)
    open(os.path.join(ROOT, "assets/img/favicon.svg"), "w").write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44"><rect width="44" height="44" rx="10" fill="#0A1E42"/><path d="M15 32V12h15M15 21h11" fill="none" stroke="#E8C875" stroke-width="3.5" stroke-linecap="round"/></svg>')
    pages = ["", "about.html", "services/", "insights.html", "resources.html", "contact.html", "careers.html"] + [f"services/{s['slug']}.html" for s in SVD] + [f"legal/{s}.html" for s in LEGAL]
    open(os.path.join(ROOT, "sitemap.xml"), "w").write('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "".join(f"<url><loc>{DOMAIN}/{p}</loc></url>" for p in pages) + "</urlset>")
    open(os.path.join(ROOT, "robots.txt"), "w").write(f"User-agent: *\nAllow: /\nSitemap: {DOMAIN}/sitemap.xml\n")

if __name__ == "__main__":
    home(); services(); others(); legal(); extras(); print("Built OK:", len(SVD), "service pages")
