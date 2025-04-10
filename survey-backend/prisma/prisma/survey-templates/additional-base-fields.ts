/**
 * Additional base fields to be added to all survey templates
 * These fields provide support for photos, notes, and markups
 * 
 * IMPORTANT: These fields use the 'array' type which requires proper handling in the frontend.
 * Make sure the SurveyField interface in packages/types/survey.ts includes 'array' as a valid type
 * and has the itemTemplate property. If these fields are not appearing in the React templates,
 * verify that the SurveyField interface is properly configured.
 * 
 * For more information, see:
 * - docs/surveys/array-fields-guide.md
 * - docs/surveys/SURVEY-Issues.md
 */
export const additionalBaseFields = {
  // Fields for photos
  surveyPhotos: {
    type: "array",
    label: "Survey Photos",
    itemTemplate: {
      photo: {
        type: "file",
        label: "Photo",
        validation: { required: true }
      },
      description: {
        type: "text",
        label: "Description",
        validation: { required: false }
      },
      location: {
        type: "text",
        label: "Location",
        validation: { required: false }
      }
    },
    validation: { required: false }
  },
  
  // Fields for detailed notes
  surveyNotes: {
    type: "array",
    label: "Survey Notes",
    itemTemplate: {
      note: {
        type: "textarea",
        label: "Note",
        validation: { required: true }
      },
      category: {
        type: "select",
        label: "Category",
        options: [
          { value: "GENERAL", label: "General" },
          { value: "ISSUE", label: "Issue" },
          { value: "RECOMMENDATION", label: "Recommendation" },
          { value: "OBSERVATION", label: "Observation" }
        ],
        validation: { required: false }
      },
      priority: {
        type: "select",
        label: "Priority",
        options: [
          { value: "LOW", label: "Low" },
          { value: "MEDIUM", label: "Medium" },
          { value: "HIGH", label: "High" }
        ],
        validation: { required: false }
      }
    },
    validation: { required: false }
  },
  
  // Fields for markups and diagrams
  markups: {
    type: "array",
    label: "Markups & Diagrams",
    itemTemplate: {
      markup: {
        type: "file",
        label: "Markup/Diagram",
        validation: { required: true }
      },
      title: {
        type: "text",
        label: "Title",
        validation: { required: true }
      },
      description: {
        type: "textarea",
        label: "Description",
        validation: { required: false }
      }
    },
    validation: { required: false }
  }
};