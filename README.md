# AI Text Transformer

A React-based application that uses Amazon Bedrock's Claude 3 Sonnet model to transform text into different tones (professional, casual, sarcastic, etc.) and generate appropriate titles.

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: AWS SDK (`@aws-sdk/client-bedrock-runtime`)
- **AI Service**: Amazon Bedrock (Claude 3 Sonnet)
- **Testing**: Vitest + React Testing Library
- **Styling**: Tailwind CSS

## 🏛️ Architecture Decision

### Current Implementation: Direct AWS Integration

This application uses a **direct frontend-to-AWS** architecture rather than the traditional client-server pattern. Here's why:

┌─────────────────┐ ┌─────────────────┐
│ React App │───▶│ Amazon Bedrock │
│ (Frontend) │ │ (Claude 3) │
└─────────────────┘ └─────────────────┘

### Alternative: Traditional Backend Architecture

The original requirements specified a Java/Spring backend:

┌─────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ React App │───▶│ Java Backend │───▶│ Amazon Bedrock │
│ (Frontend) │ │ (Spring) │ │ (Claude 3) │
└─────────────┘ └─────────────────┘ └─────────────────┘

### Why We Chose Direct Integration

| **Aspect**              | **Direct AWS SDK**         | **Backend + AWS SDK**              |
| ----------------------- | -------------------------- | ---------------------------------- |
| **Complexity**          | ✅ Lower                   | ❌ Higher                          |
| **Performance**         | ✅ Faster (no backend hop) | ❌ Additional latency              |
| **Development Speed**   | ✅ Rapid prototyping       | ❌ Two codebases                   |
| **Deployment**          | ✅ Static hosting          | ❌ Backend infrastructure          |
| **Cost**                | ✅ Lower (frontend only)   | ❌ Backend server costs            |
| **Security**            | ⚠️ API keys in frontend    | ✅ Credentials on server           |
| **Enterprise Features** | ❌ Limited                 | ✅ Logging, rate limiting, caching |
| **Scalability**         | ⚠️ Client-side rate limits | ✅ Server-controlled scaling       |

### When to Use Each Approach

#### **Direct Integration (Current)** - Best For:

- ✅ **Rapid prototyping and demos**
- ✅ **Simple, single-user applications**
- ✅ **Minimal infrastructure requirements**
- ✅ **Learning and experimentation**
- ✅ **Static hosting (Vercel, Netlify)**

#### **Backend Integration** - Best For:

- ✅ **Enterprise applications**
- ✅ **Multi-user systems with authentication**
- ✅ **Complex business logic and workflows**
- ✅ **Audit logging and compliance requirements**
- ✅ **Cost optimization through caching**
- ✅ **Integration with existing enterprise systems**

### Security Considerations

#### **Current Implementation:**

- AWS credentials are stored in environment variables
- Suitable for development and demo environments
- For production: Consider AWS Cognito for temporary credentials

#### **Production Recommendations:**

```typescript
// For production, consider:
1. AWS Cognito Identity Pools for temporary credentials
2. API Gateway + Lambda for serverless backend
3. IAM roles with minimal permissions
4. Request signing and validation

Conclusion
For this AI text transformation use case, direct AWS integration provides the optimal balance of simplicity, performance, and functionality. The architecture supports the core requirements while maintaining development velocity and deployment simplicity.
This decision can be revisited as requirements evolve toward enterprise features like user management, audit logging, or complex business workflows.
🚀 Quick Start
Prerequisites

Node.js 18+ and npm
AWS Account with appropriate permissions
Git

1. Clone and Install

git clone <repository-url>
cd ai-text-transformer
npm install

2. AWS CLI Setup

# Install AWS CLI (if not installed)
# Windows: Download from AWS website
# Mac: brew install awscli
# Linux: sudo apt install awscli

# Configure CLI
aws configure

# Test connection
aws sts get-caller-identity

# Verify Bedrock access
aws bedrock list-foundation-models --region us-east-1

3. AWS Console Configuration
3.1 Create IAM User with Bedrock Access

Navigate to IAM Console: https://console.aws.amazon.com/iam/
Create User:

Click "Users" → "Create user"
Enter username and select "Programmatic access"
Click "Next: Permissions"


Attach Policies:

Select "Attach policies directly"
Search and attach "AmazonBedrockFullAccess"
Click "Next" → "Create user"


Create Access Keys:

Go to "Users" → Select your user → "Security credentials"
Click "Create access key"
Select "Command Line Interface (CLI)"
Save the Access Key ID and Secret Access Key



3.2 Request Bedrock Model Access

Navigate to Bedrock Console: https://console.aws.amazon.com/bedrock/

Important: Ensure you're in the us-east-1 region


Request Model Access:

Click "Model access" in the left sidebar
Click "Request model access" or "Modify model access"
Find "Anthropic" section and enable:

✅ Claude 3 Sonnet
✅ Claude 3 Haiku (optional)


Click "Request access"
Wait for approval (usually instant)


Verify Access:

Go to "Playgrounds" → "Chat"
Select "Anthropic Claude 3 Sonnet"
Send a test message to confirm access



4. Environment Configuration
Quick Setup

cp .env.example .env.local

Edit .env.local with your actual AWS credentials:

VITE_AWS_ACCESS_KEY=AKIA...your-actual-access-key
VITE_AWS_SECRET_KEY=your-actual-secret-access-key
VITE_AWS_DEFAULT_REGION=us-east-1

Environment Files

.env - Default config (committed)
.env.local - Your secrets (never committed)
.env.example - Setup template (committed)

⚠️ Security: Never commit .env.local - it contains your AWS credentials and is automatically ignored by Git.

5. Start Development Server

npm run dev

Visit http://localhost:5173 to see the application!
🎯 Features
Text Transformation

Input: Any text up to 5,000 characters
Available Tones: Professional, Casual, Sarcastic, Friendly, Academic, Formal, Humorous, Persuasive, Empathetic, Confident
Output: Transformed text with AI-generated title
Error Handling: Graceful fallbacks for malformed AI responses

User Experience

Real-time character counting with limits
Loading states with spinners
Copy to clipboard functionality
Form validation with helpful error messages
Responsive design for all devices

🔧 Key Dependencies

{
	"@aws-sdk/client-bedrock-runtime": "^3.855.0",
	"react": "^18.x.x",
	"react-hook-form": "^7.x.x",
	"zod": "^3.x.x",
	"tailwindcss": "^3.x.x"
}

🧪 Testing

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

🚨 Troubleshooting
Common Issues
1. AWS CLI Configuration Issues

# Clear cache and retry
rm -rf node_modules/.cache
npm cache clean --force

# Reconfigure AWS CLI
aws configure

2. Bedrock Access Denied

Verify model access is granted in Bedrock console
Ensure IAM user has AmazonBedrockFullAccess policy
Confirm you're using the correct AWS region (us-east-1)
Check your access keys are correct in .env.local

3. Environment Variables Not Loading

Ensure .env.local file is in the project root
Restart the development server after changing .env.local
Verify variable names start with VITE_

4. Build or Runtime Errors

# Clear everything and reinstall
rm -rf node_modules package-lock.json
npm install

Debug Commands

# Check AWS credentials
aws sts get-caller-identity

# Test Bedrock access
aws bedrock list-foundation-models --region us-east-1

# Check environment variables
echo $VITE_AWS_ACCESS_KEY

📚 Resources
AWS Documentation

Amazon Bedrock Documentation
Claude 3 Models
AWS SDK for JavaScript

Development Tools

Vite Documentation
React Hook Form
Tailwind CSS
Vitest Testing Framework
```
