import { NextRequest, NextResponse } from 'next/server';

// واجهة بيانات النموذج
interface ContactFormData {
  name: string;
  email: string;
  phone?: string; // حقل الهاتف اختياري
  subject: string;
  message: string;
  recaptchaToken: string;
}

// واجهة استجابة reCAPTCHA
interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  error_codes?: string[];
}

// وظيفة محسنة للتحقق من رمز reCAPTCHA
async function verifyRecaptcha(token: string): Promise<{success: boolean; errorCodes?: string[]}> {
  try {
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!recaptchaSecretKey) {
      console.error('مفتاح reCAPTCHA السري غير محدد');
      return { success: false, errorCodes: ['missing-secret-key'] };
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: recaptchaSecretKey,
        response: token,
      }).toString(),
    });

    const data = await response.json() as RecaptchaResponse;
    
    // تسجيل المعلومات للتصحيح
    console.log('reCAPTCHA response:', data);
    
    if (!data.success) {
      return { 
        success: false, 
        errorCodes: data.error_codes || ['unknown-error'] 
      };
    }
    
    return { success: true };
  } catch (error) {
    console.error('خطأ في التحقق من reCAPTCHA:', error);
    return { success: false, errorCodes: ['verification-error'] };
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();
    const { name, email, phone, subject, message, recaptchaToken } = formData;

    // التحقق من البيانات المطلوبة
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'missing-fields', message: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }
    
    // التحقق من وجود رمز reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'missing-captcha', message: 'لم يتم توفير رمز التحقق من reCAPTCHA' },
        { status: 400 }
      );
    }

    // التحقق من صحة رمز reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { 
          error: 'invalid-recaptcha', 
          message: 'فشل التحقق من reCAPTCHA', 
          errorCodes: recaptchaResult.errorCodes 
        },
        { status: 400 }
      );
    }

    // هنا يمكنك إضافة المنطق الخاص بك لمعالجة النموذج
    // مثل إرسال بريد إلكتروني أو حفظ البيانات في قاعدة البيانات
    
    // في هذه الحالة، سنعيد استجابة ناجحة
    return NextResponse.json(
      { success: true, message: 'تم إرسال النموذج بنجاح' },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'خطأ غير معروف';
    console.error('خطأ في معالجة طلب الاتصال:', errorMessage);
    
    return NextResponse.json(
      { error: 'internal-error', message: 'حدث خطأ أثناء معالجة الطلب' },
      { status: 500 }
    );
  }
} 