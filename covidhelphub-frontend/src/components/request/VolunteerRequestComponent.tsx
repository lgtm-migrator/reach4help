import React from 'react';
import Style from './VolunteerRequestComponent.module.css';
import FieldComponent from './fieldComponents/FieldComponent';
import {
  HandleFormFieldChange,
  ValidityChecker,
  UpdateAtLeastOneSelected,
} from '../../objectModel/FormModel';
import { EXAMPLE_FORM } from './VolunteerRequestData';


const removeFromSet = (set: Set<any>, item: any) => {
  set.delete(item);
  return set;
};

interface Props {}

interface State {
  formData: any;
}

class VolunteerRequestComponent extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      formData: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Gets the form field data from the back end
   * TODO: complete the function
   */
  private getData = () => {
    return EXAMPLE_FORM;
  };

  handleChange: HandleFormFieldChange = (
    isMulti: boolean,
    fieldName: string,
    e: React.FormEvent<any>,
    validityChecker?: ValidityChecker,
    updateAtLeastOneSelected?: UpdateAtLeastOneSelected,
  ) => {
    // update the form data
    const value = e.currentTarget.value;
    if (!isMulti) {
      if (updateAtLeastOneSelected) {
        updateAtLeastOneSelected(true);
      }
      this.setState(state => ({
        formData: { ...state.formData, [fieldName]: value },
      }));
    } else {
      const checked = e.currentTarget.checked;
      this.setState(state => {
        if (!state.formData[fieldName]) {
          if (updateAtLeastOneSelected) {
            updateAtLeastOneSelected(true);
          }
          return {
            formData: { ...state.formData, [fieldName]: new Set([value]) },
          };
        }
        console.log(
          'name:',
          fieldName,
          'state.formData[fieldName]:',
          state.formData[fieldName],
        );
        if (
          updateAtLeastOneSelected &&
          !checked &&
          state.formData[fieldName].size === 1
        ) {
          updateAtLeastOneSelected(false);
        } else if (updateAtLeastOneSelected) {
          updateAtLeastOneSelected(true);
        }
        return checked
          ? {
              formData: {
                ...state.formData,
                [fieldName]: state.formData[fieldName].add(value),
              },
            }
          : {
              ...state.formData,
              [fieldName]: removeFromSet(state.formData[fieldName], value),
            };
      });
    }

    // check validity
    if (validityChecker) {
      e.currentTarget.setCustomValidity('');
      e.currentTarget.setCustomValidity(validityChecker(e));
    }
  };

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(this.state.formData);
  }

  public render() {
    const formSections = this.getData();

    return (
      <div className={Style.getInvolved}>
        <form className={Style.volunteerForm} onSubmit={this.handleSubmit}>
          {formSections.map(formSection => (
            <div key={formSection.id} className={Style.formField}>
              <h2 className={Style.informationCategory}>{formSection.label}</h2>
              <div>
                {formSection.formFields.map(formField => (
                  <FieldComponent
                    key={formField.name}
                    formField={formField}
                    handleChange={this.handleChange}
                  />
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className={Style.submit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default VolunteerRequestComponent;
