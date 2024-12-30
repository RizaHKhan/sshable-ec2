import { Peer, Port, SecurityGroup, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2"
import { Construct } from "constructs"

interface Exports {
    vpc: Vpc
    securityGroup: SecurityGroup
}

export default function networking(scope: Construct, name: string): Exports {
    const vpc = new Vpc(scope, `${name}Vpc`, {
        subnetConfiguration: [
            {
                cidrMask: 24,
                name: "PublicSubnet",
                subnetType: SubnetType.PUBLIC,
            },
        ],
    })

    const securityGroup = new SecurityGroup(scope, `${name}SecurityGroup`, {
        securityGroupName: `${name}SecurityGroup`,
        vpc,
        allowAllOutbound: false,
    })

    securityGroup.addIngressRule(
        Peer.anyIpv4(),
        Port.tcp(22),
        "Allow SSH access from the world",
    )

    return {
        vpc,
        securityGroup,
    }
}
