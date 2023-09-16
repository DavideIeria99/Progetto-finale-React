
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../../Constants';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const change = (code) => {
        i18n.changeLanguage(code);
    }

    return (
        <div className="flex">
            {LANGUAGES.map((el) => (
                <button
                    className={
                        "mx-2  uppercase " +
                        (el.code === i18n.resolvedLanguage
                            ? "font-bold tracking-widest"
                            : "")
                    }
                    onClick={() => change(el.code)}
                    key={el.code}
                >
                    {el.code}
                </button>
            ))}
        </div>
    )
}
