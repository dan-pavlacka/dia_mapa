'use client';

/*
  Použitý formulářový engine:

  - Používáme vlastní generický React komponent "GenericForm"
    - vstupní schema ve formátu JSON Schema Draft-07
    - validace přes AJV (https://ajv.js.org/)
    - React Hook Form + @hookform/resolvers/ajv (https://react-hook-form.com/)
    - styling: vlastní CSS (Form.module.css)

  Implementace:

  - schéma poznatku: poznatek.schema.json
    - vlastní error messages (errorMessage)

  - v GenericForm.jsx:
    - validace probíhá přes ajvResolver
    - vlastní vykreslování podle typu + widgetu
    - UI oddělené od validace (lze přidat různé layouty)

  Výhoda:
    - oddělená definice formulářů (schemas/xxx.schema.json)
    - jednoduché na údržbu
    - 1 komponenta (GenericForm.jsx) použitelná opakovaně

  Poznámka:
    - react-jsonschema-form by uměl i plný automat (ale tady vlastní GenericForm je lehčí na CSS a úpravy)
*/

'use client';

import { useForm } from 'react-hook-form';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
// Nepoužívej addErrors
// import addErrors from 'ajv-errors';

import { useMemo } from 'react';


export default function GenericForm({ schema, onSubmit, onCancel }) {
    const ajv = useMemo(() => {
        const ajvInstance = new Ajv({ allErrors: true, strict: false });
        addFormats(ajvInstance);
        // addErrors(ajvInstance); // Nepoužívej!
        return ajvInstance;
    }, []);

    // ručně si připrav resolver (bez @hookform/resolvers/ajv)
    const validate = ajv.compile(schema);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: async (data) => {
            const valid = validate(data);
            return {
                values: valid ? data : {},
                errors: valid
                    ? {}
                    : Object.fromEntries(
                          validate.errors.map((e) => [
                              e.instancePath.slice(1), // remove "/"
                              { message: e.message },
                          ])
                      ),
            };
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <h3>{schema.title}</h3>

            {Object.entries(schema.properties).map(([key, config]) => (
                <div key={key} className="formField">
                    <label>
                        {config.title}

                        {config.type === 'boolean' ? (
                            <input
                                type="checkbox"
                                {...register(key)}
                            />
                        ) : config.type === 'string' && config.format !== 'textarea' ? (
                            <input
                                type="text"
                                {...register(key)}
                            />
                        ) : (
                            <textarea
                                {...register(key)}
                            />
                        )}
                    </label>

                    {errors[key] && (
                        <p className="error">
                            {errors[key]?.message || 'Toto pole je povinné.'}
                        </p>
                    )}
                </div>
            ))}

            <div className="divider"></div>
            <div className="formButtons">
                <button className="formButton" type="button" onClick={onCancel}>Zrušit</button>
                <button className="formButton" type="submit">Uložit poznatek</button>
                
            </div>
        </form>
    );
}
