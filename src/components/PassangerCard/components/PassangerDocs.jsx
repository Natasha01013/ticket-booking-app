import PassangerInput from "./PassangerInput";

const PassangerDocs = ({ type, onChangeInput, series, number, birthNumber }) => {
  return (
    <div className={`passenger__docs ${type === 'child' ? 'passenger__docs--child' : ''}`}>
      <div className="passenger__docs-wrapper">
        <div className="passenger__docs-type-wrapper">
          <p className="passenger__docs-title">Тип документа</p>
          <div className="passenger__docs-type">
            {type === "adult" ? "Паспорт" : "Свидетельство о рождении"}
          </div>
        </div>
        {type === "adult" ? (
          <>
            <div className="passenger__docs-series">
              <PassangerInput
                id="series"
                name="Серия"
                ph="__  __  __  __"
                onChange={onChangeInput}
                value={series}
                type="text"
                labelClassName="passenger__input-wrapper"
                titleClassName="passenger__docs-title"
                inputClassName="passenger__docs-input"
              />
            </div>
            <div className="passenger__docs-number">
              <PassangerInput
                id="number"
                name="Номер"
                ph="__  __  __  __  __  __"
                onChange={onChangeInput}
                value={number}
                type="text"
                labelClassName="passenger__input-wrapper"
                titleClassName="passenger__docs-title"
                inputClassName="passenger__docs-input"
              />
            </div>
          </>
        ) : (
          <div className="passenger__docs-birth">
            <PassangerInput
              id="birthNumber"
              name="Номер"
              ph="_ _ _ _ _ _ _ _ _ _ _ _"
              onChange={onChangeInput}
              value={birthNumber}
              type="text"
              labelClassName="passenger__input-wrapper"
              titleClassName="passenger__docs-title"
              inputClassName="passenger__docs-input"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PassangerDocs;