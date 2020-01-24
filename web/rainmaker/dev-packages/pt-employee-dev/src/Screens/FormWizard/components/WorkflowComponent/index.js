import React, { Component } from "react";
import WorkFlowContainer from "egov-workflow/ui-containers-local/WorkFlowContainer";

class WorkflowComponent extends Component {
    render() {
        return (
            
                <WorkFlowContainer dataPath={"FireNOCs"}
                    moduleName={"FIRENOC"}
                    updateUrl={"/firenoc-services/v1/_update"}></WorkFlowContainer>
            
        );
    }
}

export default WorkflowComponent;
