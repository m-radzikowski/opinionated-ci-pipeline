#!/usr/bin/env node
import 'source-map-support/register';
import {ExampleStack} from '../src/exampleStack';
import {CDKApplication} from 'opinionated-cdk-pipeline';

new CDKApplication({
    stacks: {
        create: (scope, projectName, envName) => {
            new ExampleStack(scope, 'ExampleStack', {stackName: `${projectName}-${envName}-ExampleStack`});
        },
    },
    repository: {
        host: 'github',
        name: 'merapar/opinionated-ci-pipeline',
    },
    packageManager: 'pnpm',
    commands: {
        preInstall: [
            'npm install',
            'npm run build',
            'cd example',
        ],
    },
    cdkOutputDirectory: 'example/cdk.out',
    pipeline: [
        {
            environment: 'test',
            post: [
                'echo "do integration tests here"',
            ],
        },
    ],
    codePipeline: {
        selfMutation: false,
    },
});
