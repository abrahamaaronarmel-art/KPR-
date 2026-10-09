import { NextResponse } from 'next/server';
import { processFirstAidQuery } from '@/lib/firstAidKnowledge';

export async function POST(req: Request) {
  try {
    const { message, language, attachedFile } = await req.json();
    
    // Process query using full First Aid & Clinical Knowledge Base
    const result = processFirstAidQuery(message || "", attachedFile);

    // Simulate slight natural latency for realistic medical processing
    await new Promise((resolve) => setTimeout(resolve, 400));

    return NextResponse.json({
      replyText: result.replyText,
      riskLevel: result.riskLevel,
      category: result.category,
      emergencyNumbers: result.emergencyNumbers,
      ruleOfThumb: result.ruleOfThumb,
      firstAidTips: result.immediateSteps,
      whatNotToDo: result.whatNotToDo,
      diagnosticQuestions: result.diagnosticQuestions || [],
      suggestedDoctor: result.suggestedDoctor,
      nearbyFacilities: result.nearbyFacilities || [],
      isOffline: false
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    // Even if server encounters an error, fallback gracefully with offline first aid
    const fallback = processFirstAidQuery("Emergency assistance");
    return NextResponse.json({
      replyText: fallback.replyText,
      riskLevel: fallback.riskLevel,
      category: fallback.category,
      emergencyNumbers: fallback.emergencyNumbers,
      firstAidTips: fallback.immediateSteps,
      whatNotToDo: fallback.whatNotToDo,
      diagnosticQuestions: fallback.diagnosticQuestions || [],
      suggestedDoctor: fallback.suggestedDoctor,
      nearbyFacilities: fallback.nearbyFacilities || [],
      isOffline: true
    });
  }
}
