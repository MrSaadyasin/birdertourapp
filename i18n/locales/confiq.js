import i8n from  "i18next";
import  {initReactI18next} from "react-i18next";
i8n.use(initReactI18next).init({
    fallbackLng :'en',
    lng : "en" ,
    resources : {
        en : {
            translations : require('./en/translation.json')
        },
        es : {
            translations : require('./es/translation.json')
        },
        ar : {
            translations : require("./ar/translation.json")
        },
        fr : {
            translations : require("./fr/translation.json")
        },
        ge : {
            translations : require("./Ge/translation.json")
        },
        ch : {
            translations : require("./ch/translation.json")
        },
        ru : {
            translations : require("./ru/translation.json")
        },
        urd : {
            translations : require("./urd/translation.json")
        }
    },
    ns : ['translations'],
    defaultNS : 'translations'
});
i8n.languages = ['en', 'es'];
export  default i8n;