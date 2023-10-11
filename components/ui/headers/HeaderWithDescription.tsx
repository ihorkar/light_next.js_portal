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

    let headerClass = "text-textdefault briggs-weight-heading briggs-typeface";
    let descriptionClass = "mt-2 max-w-4xl text-textsubdued briggs-typeface";

          switch (type) {
              case 'page':
                  headerClass += " text-briggs-fontsize-heading4xl-xs-sm";
                  descriptionClass += " text-briggs-fontsize-bodylg";
                  break;
              case 'section':
                  headerClass += " text-briggs-fontsize-heading2xl-xs-sm briggs-lineheight-heading2xl-xs-sm ";
                  descriptionClass += " text-ibriggs-fontsize-bodylg";
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
            type="primary"
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
