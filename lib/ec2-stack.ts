import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"
import networking from "./constructs/01-networking"
import compute from "./constructs/02-compute"

export class Ec2Stack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        const name = "MyApp"

        const { vpc, securityGroup } = networking(this, name)
        compute(this, name, { vpc, securityGroup })
    }
}
