# EC2 instance with SSH access

Create an EC2 instance that allows for SSH access.

![image](https://github.com/user-attachments/assets/b0d9dbff-2043-44ec-87e9-3cec8a29c4fe)

## VPC

We need to create a VPC that has a public subnet.

```typescript
const vpc = new Vpc(scope, `${name}Vpc`, {
    subnetConfiguration: [
        {
            cidrMask: 24,
            name: "PublicSubnet",
            subnetType: SubnetType.PUBLIC,
        },
    ],
})
```

We then need to create a security group that will allow SSH access via port 22:

```typescript
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
```

## Compute

Finally, we use the VPC and Security group to create an instance which is part of the public subnet. 
It is very important to include the `keyPair` property as well so we can use it to connect to the instance.

```typescript
new Instance(scope, `${name}Instance`, {
    instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
    machineImage: MachineImage.latestAmazonLinux2(),
    keyPair: new KeyPair(scope, `${name}KeyPair`, {}),
    vpc,
    securityGroup,
    vpcSubnets: { subnetType: SubnetType.PUBLIC },
})
```
