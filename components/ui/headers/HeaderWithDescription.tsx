import DefaultButton from "../buttons/DefaultButton";

interface HeaderProps {
    Headline: string 
    Description: string
    type?: 'page' | 'section'
    PrimaryButtonLabel?: string;
    PrimaryButtononClick?: () => void;
    SecondaryButtonLabel?: string;
    SecondaryButtononClick?: () => void;
}

const HeaderWithDescription: React.FC<HeaderProps> = ({
    Headline, Description,  type = 'section', PrimaryButtonLabel,PrimaryButtononClick,SecondaryButtonLabel,SecondaryButtononClick}
        ) => {

    let headerClass = "";
    let descriptionClass = "mt-2 max-w-4xl text-textsubdued";

          switch (type) {
              case 'page':
                  headerClass += " briggs-headingXl";
                  descriptionClass += " briggs-bodyMd";
                  break;
              case 'section':
                  headerClass += " briggs-headingMd";
                  descriptionClass += " briggs-bodySm";
                  break;
          }      
    return (
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <div className="sm:w-0 sm:flex-1">
          <h1 className={headerClass}>{Headline}</h1>
          <p className={descriptionClass}>
          {Description}
          </p>
        </div>
        <div className="inline-flex">
          {PrimaryButtonLabel && PrimaryButtononClick && <DefaultButton
            label={PrimaryButtonLabel}
            onClick={PrimaryButtononClick}
            type="confirmation"
          />}
          {SecondaryButtonLabel && SecondaryButtononClick && (
            <DefaultButton
              label={SecondaryButtonLabel}
              onClick={SecondaryButtononClick}
              type="primary"
            />
          )}
        </div>
      </div>
    )
  }

  export default HeaderWithDescription;
