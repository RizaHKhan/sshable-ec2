import {
    Instance,
    InstanceClass,
    InstanceSize,
    InstanceType,
    KeyPair,
    MachineImage,
    SecurityGroup,
    SubnetType,
    Vpc,
} from "aws-cdk-lib/aws-ec2"
import { Construct } from "constructs"

interface Props {
    vpc: Vpc
    securityGroup: SecurityGroup
}

export default function compute(
    scope: Construct,
    name: string,
    { vpc, securityGroup }: Props,
): void {
    new Instance(scope, `${name}Instance`, {
        instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
        machineImage: MachineImage.latestAmazonLinux2(),
        keyPair: new KeyPair(scope, `${name}KeyPair`, {}),
        vpc,
        securityGroup,
        vpcSubnets: { subnetType: SubnetType.PUBLIC },
    })
}
